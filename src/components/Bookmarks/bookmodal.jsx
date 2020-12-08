import React, { Component } from 'react';
import { Modal } from "react-bootstrap";
import "./bookmodal.css";
import shortid from "shortid";
import Arrow from "../../images/arrowDown-01.png";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
  
class BookModal extends Component {
    state = { grouplist: [], titletext: "", urltext: "", grptext: "", dropshow: false }

    updatemodal = () => {
        if(localStorage.getItem("Bookmarks-list") == null) {
            localStorage.setItem("Bookmarks-list", JSON.stringify(this.state.grouplist));
        } else {
            this.setState({
                grouplist: JSON.parse(localStorage.getItem("Bookmarks-list")),
                titletext: "",
                urltext: "",
                grptext: ""
            });
        };
    };

    handletext = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    updategrp = (name) => {
        this.setState({
            grptext: name,
            dropshow: false
        })
        document.removeEventListener('mousedown', this.handleClickOutside)
    }

    handledrop = () => {
        this.setState({
            dropshow: !this.state.dropshow
        });
        document.addEventListener('mousedown', this.handleClickOutside);
    };

    handleClickOutside = (event) => {
        if(!document.getElementById("dropdownMenu").contains(event.target)) {
            this.setState({
                dropshow: false
            })
            document.removeEventListener('mousedown', this.handleClickOutside)
        }
    }

    Submit = () => {
        let bookmark = {};

        if(this.state.urltext == "") {
            alert("Please enter a valid URL")
            return
        }
        if(this.state.titletext === "") {
            bookmark.title = this.state.urltext;
        } else {
            bookmark.title = this.state.titletext;
        }        
        bookmark.id = shortid.generate();
        bookmark.url = this.state.urltext; 

        if(this.state.grptext === "") {
            bookmark.group = "Unknown"
        } else {
            bookmark.group = this.state.grptext;
        }

        let group = this.state.grouplist.filter(obj => {
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
            this.setState({
                grouplist: [group[0], ...this.state.grouplist],
            })
        }

        this.setState({
            titletext: "",
            urltext: "",
            grptext: ""
        })
    };

    ClearAll = () => {
        this.setState({
            titletext: "",
            urltext: "",
            grptext: ""
        });
    };

    Savelist = () => {
        localStorage.setItem("Bookmarks-list", JSON.stringify(this.state.grouplist));
        this.props.onHide();
    }

    DeleteAll = () => {
        this.setState({
            grouplist: []
        })
    }

    DeleteGrp = (name) => {
        this.setState({
            grouplist: this.state.grouplist.filter((grp) => grp.name !== name)
        })
    }

    removebookmark = (id, g) => {
        let group = this.state.grouplist.filter(obj => {
            return obj.name === g
        });
        group[0].list = group[0].list.filter((item) => item.id !== id);
        this.setState({
            grouplist: this.state.grouplist
        })
    }

    onDragEnd = (result) => {
        if (!result.destination) {
          return;
        }
    
        const items = reorder(
          this.state.grouplist,
          result.source.index,
          result.destination.index
        );
    
        this.setState({
          grouplist: items
        });
      }

    render() { 
        return ( 
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                centered
                onShow={this.updatemodal}
            >
                <Modal.Header className="modalHeader">
                    <Modal.Title id="contained-modal-title-vcenter">
                        Settings
                    </Modal.Title>
                    <button className="closebutton" onClick={this.props.onHide}>x</button>
                </Modal.Header>
                <Modal.Body className="modalBody">
                    <div className="modalpage">
                        <div className="modalinputs">
                            <form onSubmit={this.Submit}>
                                <div className="inputs">
                                    <div className="inputshead">Group</div>
                                    <div className="grpbox">
                                        <input 
                                        className="grpinput"
                                        type="text"
                                        name="grptext"
                                        value={this.state.grptext}
                                        onChange={this.handletext}
                                        autoComplete="off"/>
                                        <div className="grpfill">
                                            <button className="grpbtn" type="button" onClick={this.handledrop}>
                                                <img src={ Arrow } alt="dropdown" className="dropArrow"/>
                                            </button>
                                            {this.state.dropshow ? 
                                            <div className="grpmenu" id="dropdownMenu">
                                                {this.state.grouplist.map((grp) => (
                                                    <button type="button" className="menuitem" onClick={() => this.updategrp(grp.name)}>{grp.name}</button>
                                                ))}
                                            </div> : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="inputs">
                                <div className="inputshead">Title</div>
                                    <input
                                    className="tinput"
                                    type="text"
                                    name="titletext"
                                    value={this.state.titletext}
                                    onChange={this.handletext}
                                    autoComplete="off"></input>
                                </div>
                                <div className="inputs">
                                <div className="inputshead">Url</div>
                                    <input
                                    className="tinput"
                                    type="text"
                                    name="urltext"
                                    value={this.state.urltext}
                                    onChange={this.handletext}
                                    autoComplete="off"></input>
                                </div>
                                <button type="button" onClick={this.Submit} className="addmark">Add</button>
                                <button type="button" onClick={this.ClearAll} className="clearfields">Clear</button>
                            </form>
                        </div>
                        <div className="modallist">
                            <div className="listhead">
                                Bookmarks
                                <button type="button" onClick={this.DeleteAll} className="deletelistbut">Delete all</button>
                            </div>
                            <DragDropContext onDragEnd={this.onDragEnd}>
                                <Droppable droppableId="droppable">
                                {(provided) => (
                                    <div className="listbody" 
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    >
                                        {this.state.grouplist.map((grp, index) => (
                                            <Draggable key={grp.name} draggableId={grp.name} index={index}>
                                                {(provided, snapshot) => (
                                                    <div 
                                                    className="grpitem" 
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                      snapshot.isDragging,
                                                      provided.draggableProps.style
                                                    )}>
                                                        <div className="grptitle">
                                                            {grp.name}
                                                        </div>
                                                        <button className="removeitem" onClick={() => this.DeleteGrp(grp.name)}>x</button>
                                                        {grp.list.map((book) => (
                                                            <div className="bookitem" style={gettitleStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                                                <div className="booktitle">
                                                                    <a href={book.url}>{book.title}</a>
                                                                </div>
                                                                <button className="removeitem" onClick={() => this.removebookmark(book.id, book.group)}>x</button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                        {this.state.grouplist.length ? null : (
                                            <div className="emptymessage">Learner's Tab</div>
                                        )}
                                    </div>
                                )}
                                </Droppable>
                            </ DragDropContext>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modalFooter">
                    <button type="button" onClick={this.Savelist} className="savebut">Save</button>
                </Modal.Footer>
            </Modal> 
        );
    }
}
 
export default BookModal;