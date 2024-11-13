import React from 'react';
import ContactCard from './ContactCard';

function ContactList({ contacts, searchTerm, deleteContact }) {
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {filteredContacts.map(contact => (
        <ContactCard key={contact.id} contact={contact} deleteContact={deleteContact} />
      ))}
    </div>
  );
}

export default ContactList;
