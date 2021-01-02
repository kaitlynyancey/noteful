import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';
import config from '../config';


class NoteItem extends Component {
    static defaultProps = {
        onDeleteNote: () => { },
    }
    static contextType = NotesContext

    handleClickDelete = e => {
        e.preventDefault()
        const noteId = this.props.id

        fetch(`${config.API_ENDPOINT}api/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
            })
            .then(() => {
                this.props.onDeleteNote(noteId)
                this.context.deleteNote(noteId)
            })
            .catch(error => {
                console.error({ error })
            })
    }

    render() {
        return (
            <li key={this.props.id}>
                <Link to={`/note/${this.props.id}`}>
                    <h3>{this.props.notename}</h3>
                </Link>
                <p>Date Modified: {this.props.date_modified}</p>
                <button
                    className='deleteNote'
                    type = 'button'
                    onClick={this.handleClickDelete}
                >
                    Delete Note
                        </button>
            </li>
        )
    }
}

NoteItem.propTypes = {
    notename: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    date_modified: PropTypes.string.isRequired
}

export default NoteItem;