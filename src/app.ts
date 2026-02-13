import express from 'express';
import dotenv from 'dotenv';

dotenv.config(); // phải gọi trước

const app = express();
const port = process.env.PORT || 3000; // thêm fallback cho chắc

app.get('/', (req, res) => {
  res.send('Hello, da!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
