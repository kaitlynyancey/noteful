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
          render={routeProps => {
            return <Note {...routeProps} store={this.state.store}/>
          }}
        />
        <Route
          path='/folder/:folderId'
          render={routeProps => {
            return <Folder {...routeProps} store={this.state.store} />
          }}
        />
      </div>
    )
  }
}


export default App;