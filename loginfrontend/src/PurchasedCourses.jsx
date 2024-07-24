import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Form.css";

function PurchasedCourses() {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      const storedData = JSON.parse(localStorage.getItem("loginData"));
      if (storedData && storedData.id) {
        try {
          console.log("Fetching courses for user ID:", storedData.id);
          const response = await axios.get(
            `http://localhost:3003/purchased-courses/${storedData.id}`
          );
          console.log("Fetched courses:", response.data);
          setPurchasedCourses(response.data);
        } catch (error) {
          console.error("Error fetching purchased courses", error);
          setMessage("Error fetching purchased courses");
        }
      } else {
        setMessage("No user logged in");
      }
    };

    fetchPurchasedCourses();
  }, []);

  return (
    <div className="purchased-courses-container">
      <h2>Purchased Courses</h2>
      {message && <p>{message}</p>}
      <div className="course-list">
        {purchasedCourses.length > 0 ? (
          purchasedCourses.map((course, index) => (
            <div className="course-card" key={index}>
              <img
                src={course.image}
                alt={course.courseName}
                className="course-image"
              />
              <h3>{course.courseName}</h3>
              <p>{course.description}</p>
              <p>Price: ${course.price}</p>
            </div>
          ))
        ) : (
          <p>No purchased courses found</p>
        )}
      </div>
    </div>
  );
}

export default PurchasedCourses;
