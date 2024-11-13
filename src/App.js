import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
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
    <Router>
      <div className="contact-app">
        <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add-contact">Add Contact</Link></li>
          </ul>
          
          <SearchBar setSearchTerm={setSearchTerm} />
        </nav>

        <Routes>
          <Route path="/" element={
            <>
              <h1>Contact Management App</h1>
              <ContactList contacts={contacts} searchTerm={searchTerm} deleteContact={deleteContact} />
            </>
          } />

          <Route path="/add-contact" element={
            <>
              <h1>Add a New Contact</h1>
              <ContactForm addContact={addContact} />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
