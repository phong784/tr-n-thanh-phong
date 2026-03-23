import express from 'express';
import path from 'path';

const app = express();
app.use(express.json());
app.use(express.static(path.resolve()));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('index.html'));
});

export default app;