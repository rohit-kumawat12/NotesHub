import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = () => {

    const context = useContext(NoteContext);

    const {notes, fetchNote, editNote} = context;

    const [note, setNote] = useState({eid:"", etitle:"", edescription:"", etag:""});

    let navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('token')){
            fetchNote();
        }else{
            navigate('/login');
        }
        // eslint-disable-next-line
    },[fetchNote]);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({eid:currentNote._id, etitle:currentNote.title, etag:currentNote.tag, edescription:currentNote.description});
    }

    const ref=useRef(null);
    const refClose=useRef(null);

    const handleClick = (e) => {
        editNote(note.eid, note.etitle, note.edescription, note.etag);
        ref.current.click();
       }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }

    return(
        <div className="container">

        <AddNote />

        <button style={{display:"none"}} type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
                <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" onChange={onChange} value={note.etitle} required/>
                </div>

                {/* <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag}/>
                </div> */}

                <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <textarea className="form-control" id="edescription" rows="10" name="edescription" onChange={onChange} value={note.edescription} required></textarea>
                </div>
            </form>
            </div>
            <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
            </div>
        </div>
        </div>
        
        <div className="container allnotesbox my-3">
            {notes.length===0 && 'No notes to display'}
            {notes.map((note)=>{
                return <Noteitem key={note._id} updateNote={updateNote} note={note} />
            })}
        </div>
        </div>
    );
}

export default Notes;