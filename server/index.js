const express = require('express');
const cors    = require('cors');
const authRoutes = require('./routes/auth');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://netflix-clone-brown-iota-39.vercel.app'
  ],
  methods: ['POST', 'GET'],
  credentials: true,
}));
app.use(express.json());             // parse JSON request bodies

// ── Routes ──────────────────────────────────────────
app.use('/api/auth', authRoutes);

// Health-check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Netflix Login API is running.' });
});

// 404 handler for unknown routes
app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error.' });
});

// ── Start ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀  Server running at http://localhost:${PORT}`);
  console.log(`   POST http://localhost:${PORT}/api/auth/login\n`);
});
