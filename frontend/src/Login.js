import { useState } from "react";
import API from "./api";

function Login({ onLogin }) {

  const [isSignup, setIsSignup] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      if (isSignup) {
        await API.post("/signup", user);
        setError("Signup successful! Now login ✅");
        setIsSignup(false);
      } else {
        const res = await API.post("/login", user);

        if (res.data === true) {
          localStorage.setItem("login", "true");
          onLogin();
        } else {
          setError("Invalid credentials ❌");
        }
      }
    } catch {
      setError("Server error ⚠️");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(to right, #1e3c72, #2a5298)" }}
    >

      <div className="card p-4 shadow-lg text-center" style={{ width: "350px", borderRadius: "15px" }}>

        <h2>📚 Bookstore</h2>
        <p className="text-muted mb-3">
          {isSignup ? "Create Account" : "Login"}
        </p>

        {error && <div className="alert alert-info">{error}</div>}

        <input
          className="form-control mb-3"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />

        <button className="btn btn-primary w-100 mb-2" onClick={submit}>
          {isSignup ? "Signup" : "Login"}
        </button>

        <button
          className="btn btn-link"
          onClick={() => {
            setIsSignup(!isSignup);
            setError("");
          }}
        >
          {isSignup ? "Already have an account? Login" : "New user? Signup"}
        </button>

      </div>
    </div>
  );
}

export default Login;