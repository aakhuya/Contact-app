import React from 'react';

function ContactList({ contacts, searchTerm, deleteContact, setEditContact }) {
  return (
    <div className="contact-list">
      {contacts
        .filter((contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((contact) => (
          <div key={contact.id} className="contact-item">
            <span>{contact.name}</span>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
            <button
              onClick={() => setEditContact(contact)}
              className="edit-button"
            >
              Edit
            </button>
            <button onClick={() => deleteContact(contact.id)} className="delete-button">
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}

export default ContactList;
