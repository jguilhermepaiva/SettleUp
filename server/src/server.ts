import * as dotenv from 'dotenv';
dotenv.config();

import express = require('express');
import cors from 'cors'; // Correção: Usando a importação padrão
import userRoutes from './routes/userRoutes';
import groupRoutes from './routes/groupRoutes';

const app = express();

// Define a porta em que o servidor irá rodar
const PORT = process.env.PORT || 3001;

// Configura o middleware CORS para permitir requisições do seu frontend
app.use(cors());

// Configura o middleware para o Express entender requisições com corpo em JSON
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);

// Inicia o servidor e o faz "ouvir" na porta definida
app.listen(PORT, () => {
  console.log(`🚀 Servidor a rodar na porta ${PORT}`);
});
