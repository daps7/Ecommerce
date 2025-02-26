const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users');

// Register
router.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ errorMessage: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ errorMessage: 'User not found' });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errorMessage: 'Invalid credentials' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ errorMessage: err.message });
    }
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

            User.create({first_name:"root",last_name:"root",username:"Administration",email:"admin@admin.com",password:adminPassword,accessLevel:parseInt(process.env.ACCESS_LEVEL_ADMIN)}, (createError, createData) => 
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