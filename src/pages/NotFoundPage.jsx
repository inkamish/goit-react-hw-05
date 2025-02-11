import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <p>
        Oops! You seem to be lost.
        <br /> The page you are looking for does not exist (or maybe it just
        went on an adventure).
      </p>
      <span style={{ fontSize: "36px", fontWeight: "500" }}>404</span>
    </div>
  );
};

export default NotFoundPage;
