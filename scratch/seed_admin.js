const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

async function createAdmin() {
  const password = "admin-password-123"; // I'll tell the user to change this
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const student = {
    id: "admin-1",
    name: "Sam Creative Admin",
    email: "samcreativegraphics7@gmail.com",
    phone: "0743475247",
    password: hashedPassword,
    role: "admin",
    enrolledCourses: ["graphic-design", "video-editing", "solidworks", "photoshop"],
    createdAt: new Date().toISOString()
  };

  const studentsPath = path.join(__dirname, '..', 'src', 'data', 'students.json');
  let students = [];
  try {
    const data = fs.readFileSync(studentsPath, 'utf8');
    students = JSON.parse(data);
  } catch (e) {}

  // Check if exists
  const existingIdx = students.findIndex(s => s.email === student.email);
  if (existingIdx > -1) {
    students[existingIdx].role = "admin";
  } else {
    students.push(student);
  }

  fs.writeFileSync(studentsPath, JSON.stringify(students, null, 2));
  console.log("Admin account created/updated for samcreativegraphics7@gmail.com");
  console.log("Password set to: admin-password-123");
}

createAdmin();
