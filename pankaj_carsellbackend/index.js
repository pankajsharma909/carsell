// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb+srv://mrpankaj707:rzAWIBFGIrwuE4PR@cluster0.ai2ibdj.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create a user schema
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

// Create a User model
const User = mongoose.model('User', userSchema);

// Middleware to parse JSON requests
app.use(express.json());

// Register endpoint
app.post('/api/register', async(req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Login endpoint
app.post('/api/login', async(req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Check if the password is correct
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
