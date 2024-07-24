import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import PurchasedCourses from "./PurchasedCourses";
import "./Form.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [courses, setCourses] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <nav className="nav-buttons">
        <Link to="/login" onClick={() => setIsAuthenticated(false)}>
          Login
        </Link>
        <Link to="/signup" onClick={() => setIsAuthenticated(false)}>
          Signup
        </Link>
        {isAuthenticated && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/purchased-courses">Purchased Courses</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard courses={courses} setCourses={setCourses} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/courses"
          element={
            isAuthenticated ? (
              <Courses
                courses={courses}
                purchasedCourses={purchasedCourses}
                setPurchasedCourses={setPurchasedCourses}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/purchased-courses"
          element={
            isAuthenticated ? (
              <PurchasedCourses purchasedCourses={purchasedCourses} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
