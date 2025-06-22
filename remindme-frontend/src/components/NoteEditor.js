import React, { useState } from 'react';
import './NoteEditor.css';

const NoteEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);

  const handleAddNote = () => {
    if (!title.trim() || !content.trim()) return;
    setNotes([...notes, { title, content }]);
    setTitle('');
    setContent('');
  };

  return (
    <div className="note-editor-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>My Notes</h3>
        <ul>
          {notes.map((note, index) => (
            <li key={index}>{note.title}</li>
          ))}
        </ul>
      </div>

      {/* Main Note Area */}
      <div className="editor">
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="note-title"
        />
        <textarea
          placeholder="• Start typing your notes with bullet points..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="note-area"
        />
        <button onClick={handleAddNote} className="add-button">+ Add Note</button>
      </div>
    </div>
  );
};

export default NoteEditor;
