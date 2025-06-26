
// Importa o PrismaClient da biblioteca @prisma/client
import { PrismaClient } from '@prisma/client';

// Cria uma nova instância do PrismaClient
const prisma = new PrismaClient();

// Exporta a instância para que possa ser usada em outros arquivos
export default prisma;
