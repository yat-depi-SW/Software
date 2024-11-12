import { useState } from 'react';

import './Contact.css';

const Contact = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Your message has been sent!');
    setMessage('');
  };

  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Enter your message"
          required 
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;