import "./auth.css";
import { useState } from "react";
import axios from "axios";
import Login from "./Login";

const Signup = () => {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:3000/signup",
        form,
        { withCredentials: true }
      );

      if (res.data.success) {
        window.location.href = "http://localhost:3001";
      } else {
        setError(res.data.message);
      }
    } catch {
      setError("Unable to create account");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-grid">
        {/* SIGNUP */}
        <div className="auth-card">
          <h2>Create your account</h2>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={submit}>
            <input
              placeholder="Email"
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />

            <input
              placeholder="Username"
              onChange={e => setForm({ ...form, username: e.target.value })}
              required
            />

            <input
              type="password"
              placeholder="Password"
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />

            <button>Create account</button>
          </form>
        </div>

        {/* LOGIN */}
        <div className="auth-card">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Signup;
