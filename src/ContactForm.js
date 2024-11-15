import React, { useState, useEffect } from 'react';

function ContactForm({ addOrUpdateContact, editContact, setEditContact }) {
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
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
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

      <button
        type="submit"
        className={editContact ? 'edit-button' : 'add-contact-button'}
      >
        {editContact ? 'Update Contact' : 'Add Contact'}
      </button>
    </form>
  );
}

export default ContactForm;






