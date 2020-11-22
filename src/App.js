import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Main from './main.js';
import Note from './note.js';
import Folder from './folder.js';
import NotesContext from './NotesContext';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';

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

  componentDidMount() {
    fetch('http://localhost:9090/folders', {
      method: 'GET'
    })
    .then(response => {
      if(!response.ok){
        throw new Error(response.status)
      }
      return response.json()
    })
    .then(this.setFolders)
    .catch(error => this.setState({ error }))

    fetch('http://localhost:9090/notes', {
      method: 'GET'
    })
    .then(response => {
      if(!response.ok){
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
      addNote: this.addNote
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
        </NotesContext.Provider>
      </div>
    )
  }
}


export default App;