import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FarmerNavbar from "../../components/FarmerNavbar";

const FarmerLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    
    localStorage.removeItem("token");

    
    const timer = setTimeout(() => {
      navigate("/farmers/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <FarmerNavbar />
      <div style={{ textAlign: "center", marginTop: "4rem" }}>
        <h2>You’ve been signed out.</h2>
        <p>Redirecting to login...</p>
      </div>
    </div>
  );
};

export default FarmerLogout;
