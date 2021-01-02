import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Main from './main.js';
import Note from './note.js';
import Folder from './folder.js';
import NotesContext from './NotesContext';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import EditNote from './EditNote/EditNote';
import config from './config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      folders: [],
      error: null,
    }
  }

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(itm =>
      itm.id !== noteId
    )
    this.setState({
      notes: newNotes
    })
  }

  setFolders = folders => {
    this.setState({
      folders,
      error: null,
    })
  }

  setNotes = notes => {
    this.setState({
      notes,
      error: null,
    })
  }

  addFolder = folder => {
    this.state.folders.push(folder)
  }

  addNote = note => {
    this.state.notes.push(note)
  }

  updateNote = updatedNote => {
    const updatedNotes = this.state.notes.map(note =>
          (note.id !== updatedNote.id) ? note : updatedNote
        )
    this.setState({
      updatedNotes
    })
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}api/folders`, {
      method: 'GET'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status)
        }
        return response.json()
      })
      .then(this.setFolders)
      .catch(error => this.setState({ error }))

    fetch(`${config.API_ENDPOINT}api/notes`, {
      method: 'GET'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status)
        }
        return response.json()
      })
      .then(this.setNotes)
      .catch(error => this.setState({ error }))
  }


  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote,
      updateNote: this.updateNote,
    }
    return (
      <div>
        <NotesContext.Provider value={contextValue}>
          <Route
            exact path='/'
            component={Main}
          />
          <Route
            path='/note/:noteId'
            component={Note}
          />
          <Route
            path='/folder/:folderId'
            component={Folder}
          />
          <Route
            path='/addfolder'
            component={AddFolder}
          />
          <Route
            path='/addnote'
            component={AddNote}
          />
          <Route
            path='/edit/:noteId'
            component={EditNote}
          />
        </NotesContext.Provider>
      </div>
    )
  }
}


export default App;