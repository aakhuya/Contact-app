import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ContactForm({ addOrUpdateContact, editContact, setEditContact, isAddMode }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (editContact) {
      setName(editContact.name);
      setEmail(editContact.email);
      setPhone(editContact.phone);
    } else {
      setName('');
      setEmail('');
      setPhone('');
    }
  }, [editContact]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const contact = {
      id: editContact ? editContact.id : undefined,
      name,
      email,
      phone,
    };

    addOrUpdateContact(contact);

    setName('');
    setEmail('');
    setPhone('');
    setEditContact(null);

    if (isAddMode) {
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>{isAddMode ? 'Add a New Contact' : 'Edit Contact'}</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button type="submit">{isAddMode ? 'Add Contact' : 'Update Contact'}</button>
    </form>
  );
}

export default ContactForm;





