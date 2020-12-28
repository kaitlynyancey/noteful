import React, { Component } from 'react';
import NoteItem from './noteItem/noteItem';
import FolderItem from './folderItem/folderItem';
import Header from './header';
import NotesContext from './NotesContext';
import './folder.css';
import NoteError from './NoteError';
import FolderError from './FolderError';


class Folder extends Component {
    static contextType = NotesContext;
    render() {
        const folders = this.context.folders.map(folder => {
            return (
                <FolderError>
                    <FolderItem
                        id={folder.id}
                        foldername={folder.foldername}
                    />
                </FolderError>
            )
        });
        const notes = this.context.notes.map(note => {
            if (parseInt(note.folder_id) === parseInt(this.props.match.params.folderId)) {
                return (
                    <NoteError>
                        <NoteItem
                            notename={note.notename}
                            id={note.id}
                            date_modified={note.date_modified}
                        />
                    </NoteError>
                )
            }
        }
        )
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
                            onClick={() => this.props.history.push('/addfolder')}>
                            Add Folder
                        </button>
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

export default Folder;