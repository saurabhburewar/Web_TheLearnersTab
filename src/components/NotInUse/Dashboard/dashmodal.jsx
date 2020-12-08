import React, { Component } from 'react';
import { Modal, Button } from "react-bootstrap";
import "./dashmodal.css";
import shortid from "shortid";
import defaulticon from "../../images/LT-icon-01.png"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: 2,
    margin: `0 0 2px 0`,
    
    background: isDragging ? " #343a4e" : "transparent",

    ...draggableStyle
});

class DashModal extends Component {
    state = { bookmarklist: [], titletext: "", urltext: "", bookimg: defaulticon }

    updatemodal = () => {
        if(localStorage.getItem("Bookmarks-list") == null) {
            localStorage.setItem("Bookmarks-list", JSON.stringify(this.state.bookmarklist));
        } else {
            this.setState({
                bookmarklist: JSON.parse(localStorage.getItem("Bookmarks-list")),
                bookimg: defaulticon,
                titletext: "",
                urltext: ""
            });
        };
    };

    handletext = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    storeimg = (event) => {
        this.setState({
            bookimg: URL.createObjectURL(event.target.files[0])
        })
    }

    Submit = () => {
        let bookmark = {};
        if(this.state.urltext == "") {
            //Show error message
            return
        }
        if(this.state.titletext === "") {
            bookmark.title = this.state.urltext;
        } else {
            bookmark.title = this.state.titletext;
        }        
        bookmark.id = shortid.generate();
        bookmark.url = this.state.urltext;
        bookmark.icon = this.state.bookimg;
        
        this.setState({
            bookmarklist: [bookmark, ...this.state.bookmarklist],
            titletext: "",
            urltext: "",
            bookimg: defaulticon
        });
    };

    ClearAll = () => {
        this.setState({
            titletext: "",
            urltext: "",
            bookimg: defaulticon
        });
    };

    Savelist = () => {
        localStorage.setItem("Bookmarks-list", JSON.stringify(this.state.bookmarklist));
        this.props.onHide();
    }

    DeleteAll = () => {
        this.setState({
            bookmarklist: []
        })
    }

    removebookmark = (id) => {
        this.setState({
            bookmarklist: this.state.bookmarklist.filter((book) => book.id !== id)
        })
    }

    onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = reorder(this.state.bookmarklist, result.source.index, result.destination.index);

        this.setState({
            bookmarklist: items
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
                                    <div className="inputshead">Icon</div>
                                    <input type="file" onChange={this.storeimg} name="fileinput" id="fileinput" className="hide"></input>
                                    <label htmlFor="fileinput" className="btn fileinputlabel">Upload</label>
                                    <div className="tileimg">
                                        <img src={this.state.bookimg} alt="icon" className="tileicon" />
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
                                <button type="button" onClick={this.ClearAll}className="clearfields">Clear</button>
                            </form>
                        </div>
                        <div className="modallist">
                            <div className="listhead">
                                Bookmarks
                                <button type="button" onClick={this.DeleteAll} className="deletebut">Delete all</button>
                            </div>
                            <DragDropContext onDragEnd={this.onDragEnd}>
                                <Droppable droppableId="droppable">
                                    {(provided, snapshot) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef} className="listbody">
                                        {this.state.bookmarklist.map((book, index) => (
                                            <Draggable key={book.id} draggableId={book.id} index={index} >
                                                {(provided, snapshot) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)} className="listitem">
                                                    <div className="itemtitle">
                                                        <img src={book.icon} alt="icon" className="listicon" />
                                                        <a href={book.url}>{book.title}</a>
                                                    </div>
                                                    <button className="removeitem" onClick={() => this.removebookmark(book.id)}>x</button>
                                                </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                    )}
                                </Droppable>
                            </DragDropContext>               
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
 
export default DashModal;