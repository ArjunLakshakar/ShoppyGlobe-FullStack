// server.js
import express from 'express';
import mongoose from 'mongoose';
import { routes } from './Routes/routes.js';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
const port = process.env.PORT || 3000;
// app.use(cors());


// ✅ Enable CORS for all origins and HTTP methods, including preflight requests
app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT','DELETE','OPTIONS']
}));

// Load env first
dotenv.config();

console.log("JWT_SECRET:", process.env.JWT_SECRET); // should log correctly


// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));


const db = mongoose.connection;
db.on('error', (err) => console.error('MongoDB connection error:', err));
db.once('open', () => console.log('MongoDB connected successfully'));

app.use(express.json());
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));

routes(app);
