import * as dotenv from 'dotenv';
dotenv.config();

import express = require('express');
import * as cors from 'cors';
import userRoutes from './routes/userRoutes';
import groupRoutes from './routes/groupRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor a rodar na porta ${PORT}`);
});