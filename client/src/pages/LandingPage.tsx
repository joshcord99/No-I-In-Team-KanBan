import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../api/authAPI";
import auth from "../utils/auth";

const LandingPage = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const data = await login(loginData);
      auth.login(data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to login", err);
      setLoginError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-notice">
        <h1>Login to create & view tickets</h1>
      </div>
      <form className="form" onSubmit={handleLogin}>
        <h1>Login</h1>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={loginData.username || ""}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={loginData.password || ""}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        {loginError && <p className="error-message">{loginError}</p>}
      </form>
    </div>
  );
};

export default LandingPage;
