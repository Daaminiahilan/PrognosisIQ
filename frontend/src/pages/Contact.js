import React, { useState } from 'react';


function Contact  () {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    // For demo, just alert
    alert(`Thank you ${formData.name}, we will contact you soon!`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="card">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
