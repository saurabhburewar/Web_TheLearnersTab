/*global chrome*/
import { useContext, useState } from "react";
import "./bookmodal.css";
import { Modal } from "react-bootstrap";
import Arrow from "../../images/Bookmarks/arrowDown-01.png";
import importimg from "../../images/Bookmarks/import-01.svg";
import exportimg from "../../images/Bookmarks/export-01.svg";
import shortid from "shortid";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function BookModal(props) {

    const [grouplist, setGrouplist] = useState([]);
    const [titletext, setTitletext] = useState("");
    const [urltext, setUrltext] = useState("");
    const [grptext, setGrptext] = useState("");
    const [dropshow, setDropshow] = useState(false);
    const [backImg, setBackImg] = useState();
    const [githubName, setGithubName] = useState("");
    const [historyFil, setHistoryFil] = useState("");

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result;
      };
    
      const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        padding: 10,
    
        ...draggableStyle
      });
    
      const gettitleStyle = (isDragging, draggableStyle) => ({
        visibility: isDragging ? "hidden" : "visible",
        
        ...draggableStyle
      });

    const updatemodal = () => {
        setTitletext("")
        setUrltext("")
        setGrptext("")
        chrome.storage.sync.get("LTBookmarks", (result) => {
            if(result.LTBookmarks) {
                setGrouplist(result.LTBookmarks)
            }
        })
    }

    const handleGrptext = (event) => {
        setGrptext(event.target.value)
    }
    const handleUrltext = (event) => {
        setUrltext(event.target.value)
    }
    const handleTitletext = (event) => {
        setTitletext(event.target.value)
    }

    const handleClickOutside = (event) => {
        if(!document.getElementById("dropdownMenu").contains(event.target)) {
            setDropshow(false)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }

    const updategrp = (name) => {
        setGrptext(name)
        setDropshow(false)
        document.removeEventListener('mousedown', handleClickOutside)
    }

    const handledrop = () => {
        setDropshow(!dropshow)
        document.addEventListener('mousedown', handleClickOutside);
    };

    const Submit = () => {
        let bookmark = {};

        if(urltext == "") {
            alert("Please enter a valid URL")
            return
        }
        if(titletext === "") {
            bookmark.title = urltext;
        } else {
            bookmark.title = titletext;
        }        
        bookmark.id = shortid.generate();
        bookmark.url = urltext; 

        if(grptext === "") {
            bookmark.group = "Unknown"
        } else {
            bookmark.group = grptext;
        }

        let group = grouplist.filter(obj => {
            return obj.name === bookmark.group
        });
        if(Array.isArray(group) && group.length) {
            group[0].list.push(bookmark);
        } else {
            let grpobj = {};
            grpobj.name = bookmark.group;
            grpobj.list = [];
            grpobj.list.push(bookmark);
            group.push(grpobj)
            setGrouplist([group[0], ...grouplist])
        }

        setTitletext("")
        setUrltext("")
        setGrptext("")
    };

    const ClearAll = () => {
        setTitletext("")
        setUrltext("")
        setGrptext("")
    };

    const Savelist = () => {
        chrome.storage.sync.set({LTBookmarks: grouplist})
        chrome.runtime.sendMessage({message: "LTBookmarks_changed"})
        chrome.storage.local.set({LTImg: backImg})
        chrome.storage.sync.set({LTHist: historyFil})
        chrome.storage.sync.set({LTGithub: githubName})
        props.onHide();
    }

    const DeleteAll = () => {
        setGrouplist([])
    }

    const DeleteGrp = (name) => {
        setGrouplist(grouplist.filter((grp) => grp.name !== name))
    }

    const removebookmark = (id, g) => {
        let group = grouplist.filter(obj => {
            return obj.name === g
        });
        group[0].list = group[0].list.filter((item) => item.id !== id);
        setGrouplist(grouplist)
    }

    const onDragEnd = (result) => {
        if (!result.destination) {
          return;
        }
    
        const items = reorder(
          grouplist,
          result.source.index,
          result.destination.index
        );
        setGrouplist(items)
    }

    const importBookmarks = (event) => {
        const file = event.target.files[0]
        if (file.type !== "application/json") {
            alert("Please upload a JSON file");
            return
        }

        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            setGrouplist(JSON.parse(event.target.result))
        })
        reader.readAsText(file);
    }

    const exportBookmarks = () => {
        let liststring = JSON.stringify(grouplist)
        let blob = new Blob([liststring], { type: 'text/json' });

        let a = document.createElement('a');
        a.download = 'LTbookmarks.json';
        a.href = URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
    }

    const handleImage = (event) => {
        let fr = new FileReader();
        fr.onload = function () {
            setBackImg(fr.result)
        }
        fr.readAsDataURL(event.target.files[0])   
    }

    const handleHistory = (event) => {
        setHistoryFil(event.target.value)
    }

    const handleGithub = (event) => {
        setGithubName(event.target.value)
    }

    return (
        <Modal
            className='modalOverall'
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop="static"
            centered
            onShow={updatemodal}
        >
            <Modal.Header style={{ backgroundColor: 'black', border: '2px solid black' }} className="modalHeader">
                <Modal.Title id="contained-modal-title-vcenter">
                    Settings
                </Modal.Title>
                <button className="closebutton" onClick={props.onHide}>x</button>
            </Modal.Header>
            <Modal.Body  className="modalBody">
                <div className="modalpage">
                    <div className="modalinputs">
                        <form onSubmit={Submit}>
                            <div className="inputs">
                                <div className="inputshead">Group :</div>
                                <div className="grpbox">
                                    <input 
                                        className="grpinput"
                                        type="text"
                                        name="grptext"
                                        value={grptext}
                                        onChange={handleGrptext}
                                        autoComplete="off"/>
                                    <div className="grpfill">
                                        <button className="grpbtn" type="button" onClick={handledrop}>
                                            <svg className="dropArrow" id="f27ab918-a570-4e94-b157-4dbd8854a2b9" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" fill={"#7c71b9"}><title>down</title><path class="139a5a24-a0c3-43f1-bdc4-676d19d0ac42" d="M7,98c-.36-6.16,3-11.8,7.65-16.75s9.28-9.49,14.15-14c9.31-8.58,22.14-8.79,31.9-.66,1.61,1.34,3.08,2.84,4.56,4.32q41.32,41.29,82.55,82.67c3.18,3.2,5.06,3.47,8.38.12,27.75-28.06,55.72-55.9,83.54-83.9,11.79-11.87,27.21-11.71,38.55.53,3.67,4,7.68,7.6,11.42,11.5,9.82,10.23,9.71,24.05-.34,34.11Q229.77,175.6,170.09,235.21c-11.21,11.2-24.89,11.49-36.12.32Q74.36,176.23,15.06,116.62C10.31,111.84,6.89,106.17,7,98Z"/></svg>
                                        </button>
                                        {dropshow ? 
                                        <div className="grpmenu" id="dropdownMenu">
                                            {grouplist.map((grp) => (
                                                <button type="button" className="menuitem" onClick={() => updategrp(grp.name)}>{grp.name}</button>
                                            ))}
                                        </div> : null}
                                    </div>
                                </div>
                            </div>
                            <div className="inputs">
                                <div className="inputshead">Title :</div>
                                <input
                                    className="tinput"
                                    type="text"
                                    name="titletext"
                                    value={titletext}
                                    onChange={handleTitletext}
                                    autoComplete="off"></input>
                            </div>
                            <div className="inputs">
                            <div className="inputshead">Url :</div>
                                <input
                                    className="tinput"
                                    type="text"
                                    name="urltext"
                                    value={urltext}
                                    onChange={handleUrltext}
                                    autoComplete="off"></input>
                            </div>
                            <button type="button" onClick={Submit} className="addmark">Add</button>
                            <button type="button" onClick={ClearAll} className="clearfields">Clear</button>
                        </form>
                    </div>
                    <div className="modallist">
                        <div className="listhead">
                            <div className="listheadname">Bookmarks</div>
                            <button type="button" onClick={DeleteAll} className="deletelistbut">Delete all</button>
                        </div>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided) => (
                                    <div className="listbody" 
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {grouplist.map((grp, index) => (
                                            <Draggable key={grp.name} draggableId={grp.name} index={index}>
                                                {(provided, snapshot) => (
                                                    <div 
                                                        className="grpitem" 
                                                        ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style)}
                                                    >
                                                        <div className="grptitle">{grp.name}</div>
                                                        <button className="removeitem" onClick={() => DeleteGrp(grp.name)}>x</button>
                                                        {grp.list.map((book) => (
                                                            <div className="bookitem" style={gettitleStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                                                <div className="booktitle">
                                                                    <a href={book.url}>{book.title}</a>
                                                                </div>
                                                                <button className="removeitem" onClick={() => removebookmark(book.id, book.group)}>x</button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                        {grouplist.length ? null : (
                                            <div className="emptymessage">Learner's Tab</div>
                                        )}
                                    </div>
                                )}
                            </Droppable>
                        </ DragDropContext>
                    </div>
                </div>
                <div className="backImgOptions">
                    <div className="backImgHead">Add a background Image to you new tab</div>
                    <input type="file" onChange={handleImage}></input>
                </div>
                <div className="backImgOptions">
                    <div className="backOptions1">
                        <div className="backTextHead">Custom History Filter</div>
                        <input className="backInput" type="text" name="historyText" value={historyFil} onChange={handleHistory} autoComplete="off" placeholder="stackoverflow.com"></input>
                    </div>
                    <div className="backOptions1">
                        <div className="backTextHead">Github</div>
                        <input className="backInput" type="text" name="githubText" value={githubName} onChange={handleGithub} autoComplete="off" placeholder="Username"></input>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: 'black', border: '2px solid black' }} className="modalFooter">
                <div className="footerbut">
                    <button type="button" className="exportbut" title="Export bookmarks" onClick={exportBookmarks}>
                        <img src={exportimg} alt="export" />
                    </button>
                    <label for="importinput" title="Import bookmarks" className="importlabel">
                        <img src={importimg} alt="import" />
                    </label>
                    <input type="file" id="importinput" accept=".json" onChange={importBookmarks}/>
                </div>
                <div className="footergap"></div>
                <button type="button" onClick={Savelist} className="savebut">Save</button>
            </Modal.Footer>
        </Modal> 
    )
}