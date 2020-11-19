import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

class NoteItem extends Component {
    render() {
        return (
            <li key={this.props.id}>
                <Link to={`/note/${this.props.id}`}>
                    <p>{this.props.name}</p>
                </Link>
                <p>Date Modified: {this.props.dateMod}</p>
                <button>Delete Note</button>
            </li>
        )
    }
}

export default NoteItem;