import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';

function deleteNoteRequest(noteId, callback, onDeleteNote) {
    fetch(`http://localhost:9090/notes/${noteId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status)
            }
            return response.json()
        })
        .then(data => {
            onDeleteNote(noteId)
            callback(noteId)
        })
        .catch(error => console.error(error))
}

class NoteItem extends Component {
    static defaultProps={
        onDeleteNote: () => {},
    }
    render() {
        return (
            <NotesContext.Consumer>
                {(context) => (
                    <li key={this.props.id}>
                        <Link to={`/note/${this.props.id}`}>
                            <h3>{this.props.name}</h3>
                        </Link>
                        <p>Date Modified: {this.props.dateMod}</p>
                        <button
                            className='deleteNote'
                            onClick={() => {
                                deleteNoteRequest(
                                    this.props.id,
                                    context.deleteNote,
                                    this.props.onDeleteNote,
                                )
                            }}
                        >
                            Delete Note
                        </button>
                    </li>
                )}
            </NotesContext.Consumer>
        )
    }
}

NoteItem.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    dateMod: PropTypes.string.isRequired
}

export default NoteItem;