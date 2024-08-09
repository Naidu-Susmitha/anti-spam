const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/spam-emails', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the schema for spam emails
const spamEmailSchema = new mongoose.Schema({
    email: String,
    reportedAt: Date
});

// Create a model for spam emails
const SpamEmail = mongoose.model('SpamEmail', spamEmailSchema);

app.use(express.json());

app.post('/verify-email', (req, res) => {
    const email = req.body.email;

    // Implement your backend verification logic here
    // For example:
    const isVerified = true; // Replace with your actual verification logic

    if (!isVerified) {
        // Store the spam email in the database
        const spamEmail = new SpamEmail({ email: email, reportedAt: new Date() });
        spamEmail.save((err) => {
            if (err) {
                console.error('Error saving spam email:', err);
            }
        });
    }

    res.json({ isVerified: isVerified });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
