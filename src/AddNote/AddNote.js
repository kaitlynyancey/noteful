import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import Header from '../header';
import './AddNote.css'

class AddNote extends Component {

    static contextType = NotesContext;

    state = {
        error: null,
    }

    handleClickCancel = () => {
        this.props.history.goBack()
    }

    handleSubmit = e => {
        e.preventDefault()
        const newNote = {
            name: e.target.noteName.value,
            modified: new Date(),
            folderId: e.target.folders.value,
            content: e.target.noteContent.value
        }
        this.setState({ error: null })
        fetch('http://localhost:9090/notes', {
            method: 'POST',
            body: JSON.stringify(newNote),
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => {
                        throw error
                    })
                }
                return response.json()
            })
            .then(data => {
                e.target.noteName.value = ''
                e.target.noteContent.value = ''
                this.context.addNote(data)
                this.props.history.push('/')

            })
            .catch(error => {
                this.setState({ error })
            })
    }

    render() {
        const folderList = this.context.folders.map(folder => {
            return(
                <option id={folder.id} value={folder.id}>
                    {folder.name}
                </option>
            )
        })
        return (
            <section className='AddNote'>
                <Header />
                <h2>Add a new folder</h2>
                <form
                    className='AddNote_form'
                    onSubmit={this.handleSubmit}
                >
                    <div>
                        <label htmlFor='noteName'>
                            Note Name:
                        </label>
                        <input
                            type='text'
                            name='noteName'
                            id='noteName'
                            placeholder='New Note'
                            required />
                    </div>
                    <div>
                        <label htmlFor='noteContent'>
                            Content:
                            </label>
                            <br/>
                        <textarea
                            name='noteContent'
                            id='noteContent'
                            rows="10"
                            cols="50"
                            required />
                    </div>
                    <div>
                        <label htmlFor="folders">Choose a folder:</label>
                        <select id="folders" name="folders">
                            {folderList}
                        </select>
                    </div>
                    <div className='AddNote_buttons'>
                        <button type='button' onClick={this.handleClickCancel}>
                            Cancel
                        </button>
                        <button type='submit'>
                            Add
                        </button>
                    </div>
                </form>
            </section>
        )
    }
}

export default AddNote;