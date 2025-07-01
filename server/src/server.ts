// /server/src/server.ts

import * as express from 'express';
import * as cors from 'cors';
import userRoutes from './routes/userRoutes';
import groupRoutes from './routes/groupRoutes';

// Cria a aplicação Express
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Monta as rotas de usuário no prefixo /api/users
app.use('/api/users', userRoutes);

// 2. Monta as novas rotas de grupo no prefixo /api/groups
app.use('/api/groups', groupRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor a rodar na porta ${PORT}`);
});
