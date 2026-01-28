import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        form,
        { withCredentials: true }
      );

      if (res.data.success) {
        window.location.href = "http://localhost:3001";
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch {
      setError("Server error");
    }
  };

  return (
    <>
      <h3>Login</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={submit}>
        <input
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />

        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
