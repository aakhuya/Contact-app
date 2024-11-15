import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function ContactForm({ addOrUpdateContact, editContact, setEditContact }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [successMessage, setSuccessMessage] = useState('');  // State for success message

  const navigate = useNavigate();  // Initialize the useNavigate hook

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contact = {
      id: editContact ? editContact.id : undefined,
      name,
      email,
      phone,
    };

    // Add or update the contact
    await addOrUpdateContact(contact);

    // Display success message
    setSuccessMessage(editContact ? 'Contact updated successfully!' : 'Contact added successfully!');

    // Redirect to the homepage after a short delay
    setTimeout(() => {
      navigate('/');  // Navigate back to homepage
    }, 1500);  // Delay before redirect to show the success message
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
      
      {/* Show success message if the contact was added or updated */}
      {successMessage && <div className="success-message">{successMessage}</div>}

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






