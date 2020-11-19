import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class FolderItem extends Component {
    render() {
        return (
            <li key={this.props.id}>
                <NavLink to={`/folder/${this.props.id}`}>
                    {this.props.name}
                </NavLink>
            </li>
        )
    }
}

export default FolderItem;