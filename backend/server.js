const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// Connect to MySQL Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hospital_management'//database
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// API Endpoint to Add an Appointment
app.post('/api/appointments', (req, res) => {
    const { patient_name, doctor_name, date, time } = req.body;
    
    const sql = 'INSERT INTO appointments (id,patient_id,doctor_id,appointment_date,appointment_time) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [id,patient_id,doctor_id,appointment_date,appointment_time], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error inserting appointment' });
        }
        res.status(201).json({ message: 'Appointment added successfully' });
    });
});
// In your server.js or appropriate route file
app.get("/api/appointments", (req, res) => {
    db.query("SELECT * FROM appointments", (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });
  
// In your server.js file
app.get("/feedback", (req, res) => {
    db.query("SELECT * FROM feedback", (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });
  // In server.js or routes/feedback.js
app.post("/feedback", (req, res) => {
    const { patient_id, feedback_text, rating } = req.body;
  
    const query = "INSERT INTO feedback (id,patient_id, feedback_text, rating,submitted_at) VALUES (?, ?, ?, ?, ?)";
  
    db.query(query, [id,patient_id, feedback_text, rating,submitted_at], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Feedback submitted successfully", data: results });
    });
  });
  
  // In server.js or routes/billing.js

app.get("/billing", (req, res) => {
    db.query("SELECT * FROM billing", (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });
// In your server.js or routes/medicalhistory.js

app.get("/medicalhistory", (req, res) => {
    db.query("SELECT * FROM medical_history", (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });
  // In server.js or your route file (routes/medicalhistory.js)
app.post("/medicalhistory", (req, res) => {
    const { patient_id, condition, treatment } = req.body;
  
    // Query to insert the data into the medical_history table
    const query = "INSERT INTO medical_history (patient_id, condition, treatment) VALUES (?, ?, ?)";
  
    db.query(query, [patient_id, condition, treatment], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "Data inserted successfully", data: results });
    });
  });
  



  

// Start the Server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
