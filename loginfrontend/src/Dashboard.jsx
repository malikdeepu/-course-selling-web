import React, { useState, useEffect } from "react";
import "./Form.css";

function Dashboard({ courses, setCourses }) {
  const [newCourse, setNewCourse] = useState({
    id: "",
    name: "",
    description: "",
    image: "",
    price: "",
  });

  // Retrieve courses from local storage when the component mounts
  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses"));
    if (storedCourses) {
      setCourses(storedCourses);
    }
  }, [setCourses]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    setCourses((prevCourses) => {
      const updatedCourses = [...prevCourses, newCourse];
      localStorage.setItem("courses", JSON.stringify(updatedCourses));
      return updatedCourses;
    });
    setNewCourse({
      id: "",
      name: "",
      description: "",
      image: "",
      price: "",
    });
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <form className="add-course-form" onSubmit={handleAddCourse}>
        <input
          name="id"
          value={newCourse.id}
          onChange={handleChange}
          placeholder="Course ID"
          required
        />
        <input
          name="name"
          value={newCourse.name}
          onChange={handleChange}
          placeholder="Course Name"
          required
        />
        <input
          name="description"
          value={newCourse.description}
          onChange={handleChange}
          placeholder="Course Description"
          required
        />
        <input
          name="image"
          value={newCourse.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
        <input
          name="price"
          value={newCourse.price}
          onChange={handleChange}
          placeholder="Course Price"
          required
        />
        <button type="submit">Add Course</button>
      </form>
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
