import { useEffect, useState } from "react";

const FarmerFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5555/api/farmers/feedback", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setFeedbacks)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>User Feedback</h2>
      {feedbacks.length > 0 ? (
        feedbacks.map((fb) => (
          <div key={fb.id} className="border p-2 my-2">
            <p><strong>User:</strong> {fb.user?.username || "Anonymous"}</p>
            <p><strong>Message:</strong> {fb.message}</p>
            <p><strong>Date:</strong> {new Date(fb.created_at).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No feedback yet.</p>
      )}
    </div>
  );
};

export default FarmerFeedback;
