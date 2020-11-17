import React, { Component } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import './folder.css';
import STORE from './dummy-store.js';

class Folder extends Component {
    render() {
        const folders = STORE.folders.map(folder => {
            return (
                <li key={folder.id}>
                    <NavLink to={`/folder/${folder.id}`}>
                        {folder.name}
                    </NavLink>
                </li>
            )
        });
        const notes = STORE.notes.map(note => {
            if(note.folderId === this.props.match.params.folderId){
                return(
                <li key={note.id}>
                    <Link to={`/note/${note.id}`}>
                        <p>{note.name}</p>
                    </Link>
                    <p>Date Modified: {note.modified}</p>
                    <button>Delete Note</button>
                </li>
                )}
            }
        )
        
        return (
            <div>
                <header>
                    <Link to='/'>
                        <h1>Noteful</h1>
                    </Link>
                </header>
                <section className="container">
                    <nav className="item">
                        <ul>
                            {folders}
                        </ul>
                        <button>Add Folder</button>
                    </nav>
                    <main className="item item-triple">
                        <ul>
                            {notes}
                        </ul>
                    </main>
                </section>
            </div>
        )
        
    }
}

export default Folder;