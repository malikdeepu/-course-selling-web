import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Form.css";

function Signup() {
  const [signupData, setSignupData] = useState({
    id: "",
    pass: "",
    name: "",
    email: "",
    add: "",
    country: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("signupData"));
    if (storedData) {
      setSignupData(storedData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3003/signup",
        signupData
      );
      setMessage(response.data.message);
      localStorage.setItem("signupData", JSON.stringify(signupData));
    } catch (error) {
      console.error("Signup error", error);
      setMessage("Signup failed. Please try again.");
    }
  };

  const handleDelete = () => {
    localStorage.removeItem("signupData");
    setSignupData({
      id: "",
      pass: "",
      name: "",
      email: "",
      add: "",
      country: "",
    });
    setMessage("Signup data deleted.");
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(signupData).map((key) => (
          <input
            key={key}
            name={key}
            value={signupData[key]}
            onChange={handleChange}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            required
            type={
              key === "pass" ? "password" : key === "email" ? "email" : "text"
            }
          />
        ))}
        <button type="submit">Signup</button>
      </form>
      {message && (
        <p className={message.includes("failed") ? "" : "success"}>{message}</p>
      )}
      <button onClick={handleDelete}>Delete Signup Data</button>
    </div>
  );
}

export default Signup;
