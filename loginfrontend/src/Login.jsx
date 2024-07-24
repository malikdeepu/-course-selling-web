import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Form.css";

function Login({ onLogin }) {
  const [loginData, setLoginData] = useState({
    id: "",
    pass: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("loginData"));
    if (storedData) {
      setLoginData(storedData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3003/login",
        loginData
      );
      if (response.data.message === "Login successful") {
        setMessage("");
        onLogin();
        navigate("/dashboard");
        localStorage.setItem("loginData", JSON.stringify(loginData));
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const handleDelete = () => {
    localStorage.removeItem("loginData");
    setLoginData({
      id: "",
      pass: "",
    });
    setMessage("Login data deleted.");
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(loginData).map((key) => (
          <input
            key={key}
            name={key}
            value={loginData[key]}
            onChange={handleChange}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            required
            type={key === "pass" ? "password" : "text"}
          />
        ))}
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={handleDelete}>Delete Login Data</button>
    </div>
  );
}

export default Login;
