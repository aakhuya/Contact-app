import React, { useState, useEffect } from 'react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import SearchBar from './SearchBar';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editContact, setEditContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await fetch('http://localhost:5000/contacts');
    const data = await response.json();
    setContacts(data);
  };

  const addContact = async (contact) => {
    const response = await fetch('http://localhost:5000/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    });
    const newContact = await response.json();
    setContacts([...contacts, newContact]);
  };

  const deleteContact = async (id) => {
    await fetch(`http://localhost:5000/contacts/${id}`, { method: 'DELETE' });
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const updateContact = async (id, updatedContact) => {
    const response = await fetch(`http://localhost:5000/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedContact),
    });
    const updated = await response.json();
    setContacts(contacts.map(contact => (contact.id === id ? updated : contact)));
    setEditContact(null);
  };

  return (
    <div className="contact-app">
      <h1>Contact Management App</h1>
      <SearchBar setSearchTerm={setSearchTerm} />
      <ContactForm 
        addContact={addContact} 
        editContact={editContact} 
        updateContact={updateContact} 
      />
      <ContactList 
        contacts={contacts} 
        searchTerm={searchTerm} 
        deleteContact={deleteContact} 
        setEditContact={setEditContact}
      />
    </div>
  );
}

export default App;


