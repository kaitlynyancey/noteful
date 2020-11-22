import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class FolderItem extends Component {
    render() {
        return (
            <li key={this.props.id}>
                <NavLink to={`/folder/${this.props.id}`}>
                    <h3>{this.props.name}</h3>
                </NavLink>
            </li>
        )
    }
}

FolderItem.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
}

export default FolderItem;