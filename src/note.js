import React, { Component } from 'react';
import NoteItem from './noteItem/noteItem';
import Header from './header';
import NotesContext from './NotesContext';
import NoteError from './NoteError';

class Note extends Component {
    static contextType = NotesContext;
    handleDeleteNote = noteId => {
        this.props.history.push('/')
    }

    render() {
        const note = this.context.notes.find(itm =>
            parseInt(itm.id) === parseInt(this.props.match.params.noteId)
        )
        const folder = this.context.folders.find(itm =>
            parseInt(itm.id) === parseInt(note.folder_id)
        )
        return (
            <div>
                <Header />
                <section className="container">
                    <nav className="item">
                        <button
                            className="add"
                            onClick={() => this.props.history.goBack()}>
                            Go Back
                        </button>
                        <div className="center">
                            <h3>Folder: {folder.foldername}</h3>
                        </div>
                    </nav>
                    <main className="item item-triple">
                        <NoteError>
                            <NoteItem
                                notename={note.notename}
                                id={note.id}
                                date_modified={note.date_modified}
                                onDeleteNote={this.handleDeleteNote}
                            />
                        </NoteError>
                        <div>
                            <h3>Content:</h3>
                            <p>{note.content}</p>
                        </div>
                        <button
                            className="edit"
                            onClick={() => this.props.history.push(`/edit/${note.id}`)}
                        >
                            Edit Note
                        </button>
                    </main>
                </section>
            </div>
        )

    }
}

export default Note;