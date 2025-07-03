import express = require('express'); 
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import groupRoutes from './routes/groupRoutes';

// Cria a aplicação Express
const app = express();

// Define a porta em que o servidor irá rodar
const PORT = process.env.PORT || 3001;

// Configura o middleware CORS para permitir requisições do seu frontend
app.use(cors());

// Configura o middleware para o Express entender requisições com corpo em JSON
app.use(express.json());

// Monta as rotas de utilizador no prefixo /api/users
app.use('/api/users', userRoutes);

// Monta as novas rotas de grupo no prefixo /api/groups
app.use('/api/groups', groupRoutes);

// Inicia o servidor e o faz "ouvir" na porta definida
app.listen(PORT, () => {
  console.log(`🚀 Servidor a rodar na porta ${PORT}`);
});
