// /server/src/server.ts

import * as express from 'express';
import * as cors from 'cors';
import userRoutes from './routes/userRoutes';

// Cria a aplicação Express
const app = express();

// Define a porta em que o servidor irá rodar
// Usa a variável de ambiente PORT se estiver disponível, senão usa 3001
const PORT = process.env.PORT || 3001;

// Configura o middleware CORS para permitir requisições do seu frontend
// (que rodará em uma porta diferente, ex: 5173)
app.use(cors());

// Configura o middleware para o Express entender requisições com corpo em JSON
app.use(express.json());

// Monta as rotas de usuário no prefixo /api/users
// Ex: A rota '/register' em userRoutes se tornará '/api/users/register'
app.use('/api/users', userRoutes);

// Inicia o servidor e o faz "ouvir" na porta definida
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
