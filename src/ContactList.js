import React from 'react';

function ContactList({ contacts, searchTerm, deleteContact, setEditContact }) {
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  return (
    <div className="contact-list">
      {filteredContacts.map(contact => (
        <div key={contact.id} className="contact-item">
          <div className="contact-info">
            <p><strong>Name:</strong> {contact.name}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Phone:</strong> {contact.phone}</p>
          </div>
          <div className="contact-actions">
            <button onClick={() => setEditContact(contact)} className="edit-button">Edit</button>
            <button onClick={() => deleteContact(contact.id)} className="delete-button">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContactList;

