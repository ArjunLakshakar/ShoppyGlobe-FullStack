// server.js
import express from 'express';
import mongoose from 'mongoose';
import { routes } from './Routes/routes.js';
import cors from 'cors';
import dotenv from 'dotenv';

// Load env first
dotenv.config();

console.log("JWT_SECRET:", process.env.JWT_SECRET); // should log correctly

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (err) => console.error('MongoDB connection error:', err));
db.once('open', () => console.log('MongoDB connected successfully'));

app.use(express.json());
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));

routes(app);
