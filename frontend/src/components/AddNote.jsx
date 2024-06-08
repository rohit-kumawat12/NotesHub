import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";


const  AddNote = () => {

    const context = useContext(NoteContext);

    const {addNote} = context;

    const [note, setNote] = useState({title:"", description:"", tag:""});

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""});
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }

    return(
        <div>

        <div className="addnote-box">
            <form>
                <h4>Add New Note</h4>
                <div className="user-box">
                <input type="text" id="title" name="title" onChange={onChange} value={note.title} required/>
                <label>Title</label>
                </div>
                {/* <div className="user-box">
                <input type="text" id="tag" name="tag" onChange={onChange} value={note.tag} required/>
                <label>Tag</label>
                </div> */}
                <div className="user-box">
                <textarea id="description" rows="3" name="description" onChange={onChange} value={note.description} required></textarea>
                <label>Description</label>
                </div><center>
                <button type="submit" onClick={handleClick}>Add Note<span></span></button>
                </center>
            </form>
        </div>
        </div>
    );
}

export default AddNote;