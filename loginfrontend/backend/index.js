const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3003;

app.use(bodyParser.json());
app.use(cors());

let users = [];
let purchasedCourses = [];

app.post("/signup", (req, res) => {
  const { id, pass, name, email, add, country } = req.body;

  const userExists = users.some(
    (user) => user.id === id || user.email === email
  );
  if (userExists) {
    return res.json({ message: "User already exists." });
  }

  users.push({ id, pass, name, email, add, country });
  return res.json({ message: "Signup successful." });
});

app.post("/login", (req, res) => {
  const { id, pass } = req.body;

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.json({ message: "User not found" });
  }

  if (user.pass !== pass) {
    return res.json({ message: "Login failed" });
  }

  res.json({
    message: "Login successful",
    id: user.id,
    name: user.name,
    email: user.email,
    add: user.add,
    country: user.country,
  });
});

app.post("/purchase-course", (req, res) => {
  const { userId, courseId, courseName, description, price, image } = req.body;

  purchasedCourses.push({
    userId,
    courseId,
    courseName,
    description,
    price,
    image,
  });
  console.log("Purchased courses:", purchasedCourses);
  res.json({ message: "Course purchased successfully." });
});

app.get("/purchased-courses/:userId", (req, res) => {
  const userId = req.params.userId;

  console.log("Fetching courses for user ID:", userId);
  const userCourses = purchasedCourses.filter(
    (course) => course.userId === userId
  );

  res.json(userCourses);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
