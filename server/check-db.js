// 1. Carrega as variáveis do arquivo .env
require('dotenv').config();

// 2. Importa o cliente do PostgreSQL
const { Client } = require('pg');

// 3. Imprime a variável de ambiente para vermos se foi lida corretamente
console.log('Tentando conectar com a URL:', process.env.DATABASE_URL);

// 4. Cria uma nova instância do cliente com a URL do nosso .env
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    // 5. Tenta se conectar ao banco de dados
    await client.connect();
    console.log('✅ SUCESSO! Conexão com o banco de dados PostgreSQL bem-sucedida.');
  } catch (error) {
    // 6. Se der erro, mostra a mensagem de erro
    console.error('❌ ERRO: Não foi possível conectar ao banco de dados.');
    console.error(error.message);
  } finally {
    // 7. Fecha a conexão
    await client.end();
  }
}

// 8. Executa a função de teste
testConnection();
