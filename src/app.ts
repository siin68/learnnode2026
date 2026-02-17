import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import foodRoutes from './routes/foodRoutes';

dotenv.config(); 
const app = express();
const port = process.env.PORT || 3000; 

// Middleware
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'Backend is running!',
    timestamp: new Date() 
  });
});

// Routes
app.use('/api/foods', foodRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Food API available at http://localhost:${port}/api/foods`);
});
