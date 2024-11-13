import React, { useState, useEffect } from 'react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import SearchBar from './SearchBar'; 
import './App.css';


function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
      body: JSON.stringify(contact)
    });
    const newContact = await response.json();
    setContacts([...contacts, newContact]);
  };

  const deleteContact = async (id) => {
    await fetch(`http://localhost:5000/contacts/${id}`, { method: 'DELETE' });
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="contact-app">
      <h1>Contact Management App</h1>
      <SearchBar setSearchTerm={setSearchTerm} />
      <ContactForm addContact={addContact} />
      <ContactList contacts={contacts} searchTerm={searchTerm} deleteContact={deleteContact} />
    </div>
  );
}

export default App;

