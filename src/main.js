import React, { Component } from 'react';
import NoteItem from './noteItem/noteItem';
import FolderItem from './folderItem/folderItem';
import Header from './header';
import NotesContext from './NotesContext';
import './main.css';
import NoteError from './NoteError';
import FolderError from './FolderError';

class Main extends Component {
    static contextType = NotesContext;

    render() {
        const notes = this.context.notes.map(note => {
            return (
                <NoteError>
                    <NoteItem
                        name={note.name}
                        id={note.id}
                        dateMod={note.modified}
                    />
                </NoteError>
            )
        });
        const folders = this.context.folders.map(folder => {
            return (
                <FolderError>
                    <FolderItem
                        id={folder.id}
                        name={folder.name}
                    />
                </FolderError>
            )
        });
        return (
            <div>
                <Header />
                <section className="container">
                    <nav className="item">
                        <div className="center">
                            <h2>Folders</h2>
                        </div>
                        <ul>
                            {folders}
                        </ul>
                        <button
                            className="add"
                            onClick={() => this.props.history.push('/addfolder')}
                        >
                            Add Folder</button>
                    </nav>
                    <main className="item item-triple">
                        <div className="center">
                            <h2>Notes</h2>
                        </div>
                        <ul>
                            {notes}
                        </ul>
                        <div>
                            <button
                                className="add"
                                onClick={() => this.props.history.push('/addnote')}
                            >
                                Add Note
                            </button>
                        </div>
                    </main>
                </section>
            </div>
        )
    }
}


export default Main;