import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// ─── RSVP Endpoints ──────────────────────────────────────────

// POST /api/rsvp — Save a new RSVP
app.post('/api/rsvp', (req, res) => {
  try {
    const { name, email, attendance, guests, note } = req.body;

    // Validation
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters.' });
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email.' });
    }
    if (!['yes', 'no'].includes(attendance)) {
      return res.status(400).json({ error: 'Attendance must be "yes" or "no".' });
    }

    const guestCount = attendance === 'no' ? 0 : Math.min(Math.max(parseInt(guests) || 1, 1), 4);

    const stmt = db.prepare(`
      INSERT INTO rsvps (name, email, attendance, guests, note)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      name.trim(),
      email.trim().toLowerCase(),
      attendance,
      guestCount,
      (note || '').trim()
    );

    res.status(201).json({
      id: result.lastInsertRowid,
      message: 'RSVP saved successfully!'
    });
  } catch (err) {
    console.error('RSVP Error:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// GET /api/rsvp — List all RSVPs as JSON
app.get('/api/rsvp', (req, res) => {
  try {
    const rsvps = db.prepare('SELECT * FROM rsvps ORDER BY created_at DESC').all();
    res.json(rsvps);
  } catch (err) {
    console.error('Fetch RSVPs Error:', err);
    res.status(500).json({ error: 'Could not fetch RSVPs.' });
  }
});

// GET /api/rsvp/csv — Download all RSVPs as CSV
app.get('/api/rsvp/csv', (req, res) => {
  try {
    const rsvps = db.prepare('SELECT * FROM rsvps ORDER BY created_at DESC').all();
    const headers = ['ID', 'Name', 'Email', 'Attendance', 'Guests', 'Note', 'Date'];
    const rows = rsvps.map(r => [
      r.id,
      `"${String(r.name).replace(/"/g, '""')}"`,
      `"${String(r.email).replace(/"/g, '""')}"`,
      r.attendance,
      r.guests,
      `"${String(r.note || '').replace(/"/g, '""')}"`,
      `"${r.created_at}"`
    ].join(','));

    const csv = [headers.join(','), ...rows].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=rsvps-${new Date().toISOString().slice(0,10)}.csv`);
    res.send(csv);
  } catch (err) {
    console.error('CSV Export Error:', err);
    res.status(500).json({ error: 'Could not generate CSV.' });
  }
});

// GET /api/wishes/csv — Download all wishes as CSV
app.get('/api/wishes/csv', (req, res) => {
  try {
    const wishes = db.prepare('SELECT * FROM wishes ORDER BY created_at DESC').all();
    const headers = ['ID', 'Name', 'Message', 'Date'];
    const rows = wishes.map(w => [
      w.id,
      `"${String(w.name).replace(/"/g, '""')}"`,
      `"${String(w.message).replace(/"/g, '""')}"`,
      `"${w.created_at}"`
    ].join(','));

    const csv = [headers.join(','), ...rows].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=wishes-${new Date().toISOString().slice(0,10)}.csv`);
    res.send(csv);
  } catch (err) {
    console.error('CSV Export Error:', err);
    res.status(500).json({ error: 'Could not generate CSV.' });
  }
});

// ─── Wishes Endpoints ────────────────────────────────────────

// POST /api/wishes — Save a new wish
app.post('/api/wishes', (req, res) => {
  try {
    const { name, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Please add your name.' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Please add a wish.' });
    }
    if (message.trim().length > 250) {
      return res.status(400).json({ error: 'Wish must be under 250 characters.' });
    }

    const stmt = db.prepare(`
      INSERT INTO wishes (name, message)
      VALUES (?, ?)
    `);

    const result = stmt.run(name.trim(), message.trim());

    const newWish = db.prepare('SELECT * FROM wishes WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json(newWish);
  } catch (err) {
    console.error('Wish Error:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// GET /api/wishes — Fetch all wishes
app.get('/api/wishes', (req, res) => {
  try {
    const wishes = db.prepare('SELECT * FROM wishes ORDER BY created_at DESC LIMIT 50').all();
    res.json(wishes);
  } catch (err) {
    console.error('Fetch Wishes Error:', err);
    res.status(500).json({ error: 'Could not fetch wishes.' });
  }
});

// ─── Serve Frontend in Production ────────────────────────────

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ─── Start Server ────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`\n  🎉 Wedding server running at http://localhost:${PORT}`);
  console.log(`  📋 RSVP CSV:  http://localhost:${PORT}/api/rsvp/csv`);
  console.log(`  💌 Wishes CSV: http://localhost:${PORT}/api/wishes/csv\n`);
});
