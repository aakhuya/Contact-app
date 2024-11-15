import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import SearchBar from './SearchBar';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editContact, setEditContact] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:5000/contacts');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const addOrUpdateContact = async (contact) => {
    if (contact.id) {
      try {
        await fetch(`http://localhost:5000/contacts/${contact.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contact),
        });
        setContacts(contacts.map((c) => (c.id === contact.id ? contact : c)));
        setSuccessMessage('Contact updated successfully!');
      } catch (error) {
        console.error("Error updating contact:", error);
      }
    } else {
      try {
        const response = await fetch('http://localhost:5000/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contact),
        });
        const newContact = await response.json();
        setContacts([...contacts, newContact]);
        setSuccessMessage('Contact added successfully!');
      } catch (error) {
        console.error("Error adding contact:", error);
      }
    }
    setEditContact(null);

    setTimeout(() => {
      setSuccessMessage('');
    }, 10000);
  };

  const deleteContact = async (id) => {
    try {
      await fetch(`http://localhost:5000/contacts/${id}`, { method: 'DELETE' });
      setContacts(contacts.filter((contact) => contact.id !== id));
      setSuccessMessage('Contact deleted successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 10000); 
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <Router>
      <div className="contact-app">
        <h1>Contact Management App</h1>

        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

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
              <ContactList
                contacts={contacts}
                searchTerm={searchTerm}
                deleteContact={deleteContact}
                setEditContact={setEditContact}
              />
              {editContact && (
                <ContactForm
                  addOrUpdateContact={addOrUpdateContact}
                  editContact={editContact}
                  setEditContact={setEditContact}
                />
              )}
            </>
          } />
          <Route path="/add-contact" element={
            <ContactForm
              addOrUpdateContact={addOrUpdateContact}
              setEditContact={setEditContact}
              isAddMode={true}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
