import React, { useState } from 'react';
import { getToken } from '../utils/jwt';

const Feedback = () => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    const token = getToken();

    try {
      const res = await fetch('https://farmart-y80m.onrender.com/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });

      if (res.ok) {
        setMessage('');
        setStatus('✅ Feedback submitted successfully!');
      } else {
        setStatus('❌ Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Error submitting feedback.');
    }
  };

  return (
    <div className="page-container">
      <h1>Send Us Your Feedback</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
        <textarea
          rows="5"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your feedback here..."
          required
          style={{ width: '100%', padding: 10 }}
        />
        <br />
        <button type="submit">Submit Feedback</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default Feedback;
