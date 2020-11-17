import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import STORE from './dummy-store.js';
import Main from './main.js';
import Note from './note.js';
import Folder from './folder.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: STORE,

    }
  }

  render() {

    return (
      <div>
        <Route
          exact path='/'
          render={() => <Main
            store={this.state.store}
          />}
        />
        <Route
          path='/note/:noteId'
          component={Note}
        />
        <Route
          path='/folder/:folderId'
          component={Folder}
        />
      </div>
    )
  }
}


export default App;