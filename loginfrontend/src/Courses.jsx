import React from "react";
import axios from "axios";
import "./Form.css";

function Courses({ courses, setPurchasedCourses }) {
  const handleBuyCourse = async (course) => {
    const storedData = JSON.parse(localStorage.getItem("loginData"));
    if (storedData && storedData.id) {
      try {
        const response = await axios.post(
          "http://localhost:3003/purchase-course",
          {
            userId: storedData.id,
            courseId: course.id,
            courseName: course.name,
            description: course.description,
            price: course.price,
            image: course.image,
          }
        );
        if (response.status === 200) {
          setPurchasedCourses((prevPurchased) => [...prevPurchased, course]);
        }
      } catch (error) {
        console.error("Error purchasing course", error);
      }
    }
  };

  return (
    <div className="courses-container">
      <h2>Available Courses</h2>
      <div className="course-list">
        {courses.map((course, index) => (
          <div className="course-card" key={index}>
            <img
              src={course.image}
              alt={course.name}
              className="course-image"
            />
            <h3>{course.name}</h3>
            <p>{course.description}</p>
            <p>Price: ${course.price}</p>
            <button onClick={() => handleBuyCourse(course)}>Buy Course</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
