import express from 'express';
import './server.js';

const app = express();
app.use(express.json());

export default app;
