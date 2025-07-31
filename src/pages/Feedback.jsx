import React, { useState } from 'react';
import { getToken } from '../utils/jwt';

const Feedback = () => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    const token = getToken();

    if (!message.trim()) {
      setStatus('❌ Please enter a valid message.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('http://localhost:10000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: message.trim() }),
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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container" style={{ padding: 20 }}>
      <h1>Send Us Your Feedback</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
        <label htmlFor="feedback">Your Feedback:</label>
        <textarea
          id="feedback"
          rows="5"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your feedback here..."
          required
          style={{ width: '100%', padding: 10, marginTop: 10 }}
        />
        <br />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
      {status && <p style={{ marginTop: 10 }}>{status}</p>}
    </div>
  );
};

export default Feedback;



// import React, { useState } from 'react';
// import { getToken } from '../utils/jwt';

// const Feedback = () => {
//   const [message, setMessage] = useState('');
//   const [status, setStatus] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus('');
//     const token = getToken();

//     try {
//       const res = await fetch('http://localhost:10000/api/feedback', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ message }),
//       });

//       if (res.ok) {
//         setMessage('');
//         setStatus('✅ Feedback submitted successfully!');
//       } else {
//         setStatus('❌ Something went wrong.');
//       }
//     } catch (err) {
//       console.error(err);
//       setStatus('❌ Error submitting feedback.');
//     }
//   };

//   return (
//     <div className="page-container">
//       <h1>Send Us Your Feedback</h1>
//       <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
//         <textarea
//           rows="5"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Write your feedback here..."
//           required
//           style={{ width: '100%', padding: 10 }}
//         />
//         <br />
//         <button type="submit">Submit Feedback</button>
//       </form>
//       {status && <p>{status}</p>}
//     </div>
//   );
// };

// export default Feedback;
