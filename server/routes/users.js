const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
require('dotenv').config();

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, accessLevel } = req.body;
        if (!username || !email || !password || accessLevel === undefined) {
            return res.status(400).json({ errorMessage: "All fields are required" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            accessLevel
        });
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ errorMessage: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get current user
router.get('/me', auth(1), async (req, res) => {
    res.json(req.user);
});

// IMPORTANT
// Obviously, in a production release, you should never have the code below, as it allows a user to delete a database collection
// The code below is for development testing purposes only 
router.post(`/users/reset_user_collection`, (req,res) => 
{
    User.deleteMany({}, (error, data) => 
    {
        if(data)
        {
            const adminPassword = `123!"£qweQWE`

            User.create({username:"Administration",email:"admin@admin.com",password:adminPassword,accessLevel:parseInt(process.env.ACCESS_LEVEL_ADMIN)}, (createError, createData) => 
            {
                if(createData)
                {
                    res.json(createData)
                }
                else
                {
                    res.json({errorMessage:`Failed to create Admin user for testing purposes`})
                }
            })
        }
        else
        {
            res.json({errorMessage:`User is not logged in`})
        }
    })                
})

module.exports = router;