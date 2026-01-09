import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    // Mocked login
    setTimeout(() => {
      setLoading(false);
      if (email === "eve.holt@reqres.in" && password === "cityslicka") {
        const fakeToken = "mocked-jwt-token-123";
        login(fakeToken); // AuthContext stores token and tokenTime
        navigate("/dashboard");
      } else {
        setError("Invalid email or password.");
      }
    }, 1000);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #74ebd5, #ACB6E5)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "360px",
          padding: "40px",
          borderRadius: "15px",
          backgroundColor: "white",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "25px", color: "#2c3e50" }}>Login</h2>

        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />

        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(90deg, #6a11cb, #2575fc)",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => !loading && (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => !loading && (e.currentTarget.style.opacity = "1")}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {loading && <Loader />}

        {error && (
          <ErrorMessage
            message={error}
            style={{
              backgroundColor: "#ffe6e6",
              color: "#e74c3c",
              padding: "10px",
              borderRadius: "6px",
              marginTop: "15px",
              fontWeight: "bold",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
