import React, { Component } from 'react';
import Header from '../header';
import NotesContext from '../NotesContext';

export default class EditNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            notename: "",
            folder_id: "",
            content: "",
            error: null,
        }
    }

    static contextType = NotesContext;

    setNote = note => {
        this.setState({
            notename: note.notename,
            folder_id: note.folder_id,
            content: note.content,
            error: null,
        })
    }

    updateFolder = event => {
        this.setState({folder_id: event.target.value})
    }

    componentDidMount() {
        const noteId = this.props.match.params.noteId
        fetch(`http://localhost:8000/api/notes/${noteId}`, {
            method: 'GET'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status)
                }
                return response.json()
            })
            .then(this.setNote)
            .catch(error => this.setState({ error }))
    }

    handleClickCancel = () => {
        this.props.history.goBack()
    }

    handleSubmit = e => {
        e.preventDefault()
        const newNote = {
            id: parseInt(this.props.match.params.noteId),
            notename: e.target.noteName.value,
            date_modified: new Date(),
            folder_id: parseInt(e.target.folders.value),
            content: e.target.noteContent.value
        }
        this.setState({ error: null })
        fetch(`http://localhost:8000/api/notes/${this.props.match.params.noteId}`, {
            method: 'PATCH',
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
            })
            .then(() => {
                this.resetFields(newNote)
                this.context.updateNote(newNote)
                this.props.history.push('/') 
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }

    resetFields = (newFields) => {
        this.setState({
            id: newFields.id || '',
            notename: newFields.noteName || "",
            folder_id: newFields.folder_id || "",
            content: newFields.content || "",
        })
    }

    render() {
        const { notename, folder_id, content } = this.state
        const folderList = this.context.folders.map(folder => {
            return (
                <option id={folder.id} value={folder.id}>
                    {folder.foldername}
                </option>
            )
        })

        return (
            <div>
                <Header />
                <section className='EditNoteForm'>
                    <h2>Edit article</h2>
                    <form
                        className='EditNote_form'
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
                                required
                                defaultValue={notename}
                            />
                        </div>
                        <div>
                            <label htmlFor='noteContent'>
                                Content:
                            </label>
                            <br />
                            <textarea
                                name='noteContent'
                                id='noteContent'
                                rows="10"
                                cols="50"
                                required
                                defaultValue={content} />
                        </div>
                        <div>
                            <label htmlFor="folders">Choose a folder:</label>
                            <select id="folders" name="folders" defaultValue={this.state.folder_id} onChange={this.updateFolder}>
                                {folderList}
                            </select>
                        </div>
                        <div className='EditNote_buttons'>
                            <button type='button' onClick={this.handleClickCancel}>
                                Cancel
                        </button>
                            <button type='submit'>
                                Update
                        </button>
                        </div>
                    </form>
                </section>
            </div>
        )
    }
}