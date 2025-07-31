import { useEffect, useState } from "react";
import "../../Stylesheets/FeedbackList.css";
import FarmerNavbar from "../../components/FarmerNavbar";

const FeedbackList = () => {
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mock data
    const mockFeedback = [
      {
        id: 1,
        rating: 5,
        comment: "Great experience buying from this farmer!",
        user: {
          username: "john_doe",
          profile_picture: "https://i.pravatar.cc/100?img=1",
        },
        image_url: "https://via.placeholder.com/300x200?text=Animal+Bought",
      },
      {
        id: 2,
        rating: 4,
        comment: "Animal was healthy and well taken care of.",
        user: {
          email: "jane@example.com",
          profile_picture: "https://i.pravatar.cc/100?img=2",
        },
        image_url: "",
      },
      {
        id: 3,
        rating: 3,
        comment: "It took some time to get updates, but good overall.",
        user: {
          username: "mike_farmbuyer",
          profile_picture: "https://i.pravatar.cc/100?img=3",
        },
        image_url: "https://via.placeholder.com/300x200?text=Delivery+Proof",
      },
    ];

    // Set mock feedback
    setFeedback(mockFeedback);

    // Uncomment this for live data
    // Fetch feedback from the server
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
                {f.user?.profile_picture && (
                  <img
                    src={f.user.profile_picture}
                    alt="User"
                    className="user-avatar"
                  />
                )}
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
