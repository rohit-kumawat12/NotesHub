import { useState } from "react";
import NoteContext from "./NoteContext";

 const NoteState = (props) => {

    // const host = 'https://noteshub-backend-rstx.onrender.com/';
    const host = 'http://localhost:5000/api/';
    
    const noteInitial  = [ ]

    const [notes, setNotes] = useState(noteInitial);

    const fetchNote = async () => {

        const response = await fetch(`${host}notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        const json = await response.json();
        setNotes(json);
    }

    const addNote = async (title, description, tag) => {

        const response = await fetch(`${host}notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });

        const note = await response.json();
        setNotes(notes.concat(note));
        
    }

    const deleteNote = async (id) => {

        const response = await fetch(`${host}notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const newNotes = notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
        const json = await response.json();
        console.log(json);
    }

    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        console.log(json);
        
        for(let i=0;i<notes.length;i++){
            const element = notes[i];
            if(element._id===id){
                notes[i].title=title;
                notes[i].description=description;
                notes[i].tag=tag;
                break;
            }
        }
    }

    const getUser = async () => {

        const response = await fetch(`${host}auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        const json = await response.json();
        return json;
    }

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, fetchNote, getUser}}>
            {props.children}
        </NoteContext.Provider>
    );
 }

 export default NoteState;