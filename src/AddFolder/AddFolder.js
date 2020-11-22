import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import Header from '../header';
import './AddFolder.css';

class AddFolder extends Component {

    static contextType = NotesContext;

    state = {
        error: null,
    }

    handleClickCancel = () => {
        this.props.history.goBack()
    }

    handleSubmit = e => {
        e.preventDefault()
        const newFolder = {
            name: e.target.folderName.value
        }
        console.log()
        this.setState({ error: null })
        fetch('http://localhost:9090/folders', {
            method: 'POST',
            body: JSON.stringify(newFolder),
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
            e.target.folderName.value = ''
            
            this.context.addFolder(data)
            this.props.history.push('/')
            
        })
        .catch(error => {
            this.setState({ error })
        })
    }

    render() {
        return (
            <section className='AddFolder'>
                <Header />
                <h2>Add a new folder</h2>
                <form
                    className='AddFolder_form'
                    onSubmit={this.handleSubmit}
                >
                    <div>
                        <label htmlFor='folderName'>
                            Folder Name:
                        </label>
                        <input
                            type='text'
                            name='folderName'
                            id='folderName'
                            placeholder='New Folder'
                            required />
                    </div>
                    <div className='AddBookmark_button'>
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


export default AddFolder;