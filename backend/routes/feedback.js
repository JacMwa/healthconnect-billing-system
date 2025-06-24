const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM feedback', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { patient_id, comments, rating } = req.body;
    db.query('INSERT INTO feedback (id,patient_id, feedback_text, rating,submitted_at) VALUES (?, ?, ?, ?, ?)',
        [id,patient_id, feedback_text, rating,submitted_at], (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: 'Feedback submitted successfully' });
        });
});



module.exports = router;
