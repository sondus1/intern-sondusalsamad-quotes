import express from 'express';
import quoteRoutes from './src/routes/quoteRoutes.js';

const app = express();
const PORT = 5000;

app.use(express.json());

app.use('/quotes', quoteRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found." });
});

app.listen(PORT, () => {
  console.log(`🚀 Quotes API Server running smoothly at http://localhost:${PORT}`);
});