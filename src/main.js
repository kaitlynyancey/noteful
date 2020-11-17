import React, { Component } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import './main.css';

class Main extends Component {
    render() {
        const notes = this.props.store.notes.map(note => {
            return (
                <li key={note.id}>
                    <Link to={`/note/${note.id}`}>
                        <p>{note.name}</p>
                    </Link>
                    <p>Date Modified: {note.modified}</p>
                    <button>Delete Note</button>
                </li>
            )
        });
        const folders = this.props.store.folders.map(folder => {
            return (
                <li key={folder.id}>
                    <NavLink to={`/folder/${folder.id}`}>
                        {folder.name}
                    </NavLink>
                </li>
            )
        });
        return (
            <div>
                <header>
                    <Link to='/'>
                        <h1>Noteful</h1>
                    </Link>
                </header>
                <section className="container">
                    <nav className="item">
                        <ul>
                            {folders}
                        </ul>
                        <button>Add Folder</button>
                    </nav>
                    <main className="item item-triple">
                        <ul>
                            {notes}
                        </ul>
                    </main>
                </section>
            </div>
        )
    }
}


export default Main;