import React, { useState } from 'react';
import './NotesOptions.css';
import NoteEditor from './NoteEditor'; 

const NotesOptions = () => {
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [showReminderForm, setShowReminderForm] = useState(false);


  if (showNoteEditor) return <NoteEditor />;
  if (showReminderForm) return <div style={{ textAlign: 'center', marginTop: '50px' }}>⏰ Reminder form coming soon!</div>;

  return (
    <div className="button-container">
      <div className="tooltip-wrapper">
        <button
          className="round-button note-button"
          onClick={() => setShowNoteEditor(true)}
        >
           📝
        </button>
        <span className="tooltip-text">Make Notes to Remember</span>
      </div>

      <div className="tooltip-wrapper">
        <button
          className="round-button alert-button"
          onClick={() => setShowReminderForm(true)}
          
        >
           ⏰
        </button>
        <span className="tooltip-text">Remind Me with Email Alerts</span>
      </div>
    </div>
  );
};

export default NotesOptions;
