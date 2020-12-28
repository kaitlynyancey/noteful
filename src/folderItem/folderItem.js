import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class FolderItem extends Component {
    render() {
        return (
            <li key={this.props.id}>
                <NavLink to={`/folder/${this.props.id}`}>
                    <h3>{this.props.foldername}</h3>
                </NavLink>
            </li>
        )
    }
}

FolderItem.propTypes = {
    foldername: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
}

export default FolderItem;