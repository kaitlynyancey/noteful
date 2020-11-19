import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import NoteItem from './noteItem/noteItem';
import Header from './header';

class Note extends Component {

    render() {
        const note = this.props.store.notes.find(itm =>
            itm.id === this.props.match.params.noteId
        )
        const folder = this.props.store.folders.find(itm =>
            itm.id === note.folderId
        )
        return (
            <div>
                <Header />
                <section className="container">
                    <nav className="item">
                        <button
                            onClick={() => this.props.history.goBack()}>
                            Go Back
                        </button>
                        <div>
                            <h3>Folder: {folder.name}</h3>
                        </div>
                    </nav>
                    <main className="item item-triple">
                        <NoteItem
                            name={note.name}
                            id={note.id}
                            dateMod={note.modified}
                        />
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