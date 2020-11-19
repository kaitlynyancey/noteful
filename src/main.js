import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import NoteItem from './noteItem/noteItem';
import FolderItem from './folderItem/folderItem';
import Header from './header';
import NotesContext from './NotesContext';
import './main.css';

class Main extends Component {
    static contextType = NotesContext;

    render() {
        const notes = this.context.notes.map(note => {
            return (
                <NoteItem
                    name={note.name}
                    id={note.id}
                    dateMod={note.modified}
                />
            )
        });
        const folders = this.context.folders.map(folder => {
            return (
                <FolderItem
                    id={folder.id}
                    name={folder.name}
                />
            )
        });
        return (
            <div>
                <Header />
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


export default Main;