import { useEffect, useState } from "react";
import "../../Stylesheets/FeedbackList.css";
import FarmerNavbar from "../../components/FarmerNavbar";

const FeedbackList = () => {
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://farmart-y80m.onrender.com/api/farmers/feedback", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch feedback");
        return res.json();
      })
      .then((data) => setFeedback(data.feedback || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      <FarmerNavbar />
      <div className="feedback-container">
        <h2>User Feedback</h2>
        {error && <p className="error-msg">{error}</p>}
        {feedback.length === 0 ? (
          <p className="no-feedback">No feedback available.</p>
        ) : (
          <div className="feedback-grid">
            {feedback.map((f) => (
              <div className="feedback-card" key={f.id}>
                <p className="rating">⭐ {f.rating} / 5</p>
                <p className="comment">"{f.comment}"</p>

               
                <p className="user-info">
                  — by <strong>{f.user?.username || f.user?.email || "Anonymous"}</strong>
                </p>

                {f.image_url && (
                  <img
                    src={f.image_url}
                    alt="Feedback"
                    className="feedback-image"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FeedbackList;
