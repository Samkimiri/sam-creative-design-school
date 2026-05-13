const fs = require('fs');
const path = require('path');

function updateAdmins() {
  const studentsPath = path.join(__dirname, '..', 'src', 'data', 'students.json');
  let students = [];
  try {
    const data = fs.readFileSync(studentsPath, 'utf8');
    students = JSON.parse(data);
  } catch (e) {
    console.error("Could not read students.json");
    return;
  }

  const emailsToAdmin = [
    "samcreativegraphics7@gmail.com",
    "samcreativesgraphics7@gmail.com"
  ];

  students = students.map(s => {
    if (emailsToAdmin.includes(s.email.toLowerCase())) {
      console.log(`Setting admin for: ${s.email}`);
      return { 
        ...s, 
        role: "admin",
        phone: s.phone || "0743475247" // Add phone if missing
      };
    }
    return s;
  });

  fs.writeFileSync(studentsPath, JSON.stringify(students, null, 2));
  console.log("Done.");
}

updateAdmins();
