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
            itm.id === this.props.match.params.noteId
        )
        const folder = this.context.folders.find(itm =>
            itm.id === note.folderId
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
                            <h3>Folder: {folder.name}</h3>
                        </div>
                    </nav>
                    <main className="item item-triple">
                        <NoteError>
                            <NoteItem
                                name={note.name}
                                id={note.id}
                                dateMod={note.modified}
                                onDeleteNote={this.handleDeleteNote}
                            />
                        </NoteError>
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