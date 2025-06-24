const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM medical_history', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { patient_id, diagnosis, treatment, date } = req.body;
    db.query('INSERT INTO medical_history (patient_id, diagnosis, treatment, date) VALUES (?, ?, ?, ?)',
        [patient_id, diagnosis, treatment, date], (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: 'Medical history added successfully' });
        });
});

module.exports = router;
