"use strict";
require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authQuery = require("../db/auth")
const authMiddleware = require('../auth/authMiddleware');
const router = express.Router();

// Protected route
router.get('/auth', authMiddleware, async (req, res) => {
  try {
    const user = await authQuery.checkAccount(req.user.username)
    console.log(user)
    if (user) {
      res.json({ isAuthenticated: true, username: user });
    } else {
      res.json({ isAuthenticated: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// user registration route
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    let result;
    result = await authQuery.createAccount(username, hashedPassword);
    if (result === undefined) {
      res.status(200).json({ error: 'Username already exists' });
      return
    }

    res.json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// user login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Retrieve the user from the database
    const result = await authQuery.getAccount(username);
    const user = result.rows[0];

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;