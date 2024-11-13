import React from 'react';

function ContactCard({ contact, deleteContact }) {
  return (
    <div className="contact-card">
      <p>Name: {contact.name}</p>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
      <button onClick={() => deleteContact(contact.id)}>Delete</button>
    </div>
  );
}

export default ContactCard;
