// Simple middleware that checks the request body contains
// non-empty email and password before the route handler runs.

function validateLoginBody(req, res, next) {
  const { email, password } = req.body;

  if (!email || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  if (!password || typeof password !== 'string' || !password.trim()) {
    return res.status(400).json({ message: 'Password is required.' });
  }

  next();
}

module.exports = { validateLoginBody };
