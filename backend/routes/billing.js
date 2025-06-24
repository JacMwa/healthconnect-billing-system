const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM billing', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { patient_id, amount, status, date } = req.body;
    db.query('INSERT INTO billing (id,patient_id,appointment_id,invoice_number,amount,payment_method,payment_status,transaction_token,transaction_date,created_at ,updated_at 	) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id,patient_id,appointment_id,invoice_number,amount,payment_method,payment_status,transaction_token,transaction_date,created_at ,updated_at ], (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: 'Billing record added successfully' });
        });
});

module.exports = router;
