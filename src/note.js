import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import STORE from './dummy-store.js';

class Note extends Component {
    
    render() {
        const note = STORE.notes.find(itm =>
            itm.id === this.props.match.params.noteId
        )
        const folder = STORE.folders.find(itm =>
            itm.id === note.folderId
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
                        <Link to='/'>
                            <button>Go Back</button>
                        </Link>
                        <div>
                            <h3>Folder: {folder.name}</h3>
                        </div>   
                    </nav>
                    <main className="item item-triple">
                        <li>
                            <p><b>{note.name}</b></p>
                            <p>Date Modified: {note.modified}</p>
                            <button>Delete Note</button>
                        </li>
                        <div>
                            <h3>Content:</h3>
                            <p>{note.content}</p>
                        </div>
                    </main>
                </section>
            </div>
        )
        
    }
}

export default Note;