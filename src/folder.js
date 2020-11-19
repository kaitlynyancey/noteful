import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import NoteItem from './noteItem/noteItem';
import FolderItem from './folderItem/folderItem';
import Header from './header';
import './folder.css';

class Folder extends Component {
    render() {
        const folders = this.props.store.folders.map(folder => {
            return (
                <FolderItem
                    id={folder.id}
                    name={folder.name}
                />
            )
        });
        const notes = this.props.store.notes.map(note => {
            if(note.folderId === this.props.match.params.folderId){
                return(
                    <NoteItem
                    name={note.name}
                    id={note.id}
                    dateMod={note.modified}
                />
                )}
            }
        )
        
        return (
            <div>
                <Header />
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

export default Folder;