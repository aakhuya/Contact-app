import React, { useState, useEffect } from 'react';

function ContactForm({ addContact, editContact, updateContact }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

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
    const contact = { name, email, phone };

    if (editContact) {
      updateContact(editContact.id, contact);
    } else {
      addContact(contact);
    }

    // Reset form fields after submit
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required
      />
      <input 
        type="text" 
        placeholder="Phone" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
        required
      />
      <button type="submit">{editContact ? 'Update Contact' : 'Add Contact'}</button>
    </form>
  );
}

export default ContactForm;
