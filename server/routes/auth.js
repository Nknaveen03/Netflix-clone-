const express = require('express');
const router = express.Router();
const mockUsers = require('../data/mockUsers');
const { validateLoginBody } = require('../middleware/validate');

// POST /api/auth/login
// Body: { email: string, password: string }
// Returns 200 with user info on success, 401 on wrong credentials
router.post('/login', validateLoginBody, (req, res) => {
  const { email, password } = req.body;

  // Find user — case-insensitive email match
  const user = mockUsers.find(
    (u) =>
      u.email.toLowerCase() === email.trim().toLowerCase() &&
      u.password === password
  );

  if (!user) {
    // Generic message — don't tell attacker which field was wrong
    return res.status(401).json({
      message: 'Incorrect email or password. Please try again.',
    });
  }

  // Return safe user object (never return the password)
  const { password: _pw, ...safeUser } = user;

  return res.status(200).json({
    message: 'Login successful',
    user: safeUser,
  });
});

module.exports = router;
