const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
    const sql = "SELECT * FROM appointments";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});
app.post('/api/appointments', (req, res) => {
    const { id,patientName,date,time,doctor,notes,created_at } = req.body;
    
    const sql = 'INSERT INTO appointment (id,patientName,date,time,doctor,notes,created_at 	) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [id,patientName,date,time,doctor,notes,created_at], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error inserting appointment' });
        }
        res.status(201).json({ message: 'Appointment added successfully' });
    });
});
module.exports = router;
