import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const Noteitem = (props) => {
    const {note, updateNote} = props;

    const context = useContext(NoteContext);

    const {deleteNote} = context;

    return(
            <div className="card" style={{width:"18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description?.length > 50 ? note.description.slice(0, 50) + '...' : note.description}</p>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                    <i className="fa-solid fa-trash mx-2" onClick={() => {deleteNote(note._id)}}></i>
                </div>
            </div>
    );
}

export default Noteitem;