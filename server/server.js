import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dsnove';

app.use(cors());
app.use(express.json());

const teamSchema = new mongoose.Schema({
  id: String,
  name: String,
  role: String,
  bio: String,
  image: String,
  socials: {
    linkedin: String,
    github: String,
  },
});

const Team = mongoose.model('Team', teamSchema);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.get('/api/team', async (_req, res) => {
  try {
    const team = await Team.find({}).lean();
    res.json(team);
  } catch (error) {
    console.error('Team fetch error:', error);
    res.status(500).json({ error: 'Failed to load team data' });
  }
});

app.post('/api/team', async (req, res) => {
  try {
    const teamMember = await Team.create(req.body);
    res.status(201).json(teamMember);
  } catch (error) {
    console.error('Team create error:', error);
    res.status(500).json({ error: 'Failed to save team data' });
  }
});

app.put('/api/team/:id', async (req, res) => {
  try {
    const updatedMember = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMember);
  } catch (error) {
    console.error('Team update error:', error);
    res.status(500).json({ error: 'Failed to update team data' });
  }
});

app.delete('/api/team/:id', async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error('Team delete error:', error);
    res.status(500).json({ error: 'Failed to delete team data' });
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    app.listen(PORT, () => console.log(`Server running on port ${PORT} without MongoDB`));
  }
};

startServer();
