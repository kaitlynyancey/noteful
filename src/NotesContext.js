import React from 'react';

const NotesContext = React.createContext({
    notes: [],
    folders: [],
    deleteNote: () => {},
    addNote: () => {},
    addFolder: () => {},
    updateNote: () => {},
})

export default NotesContext