# SettleUp 💸

Bem-vindo ao SettleUp! Uma aplicação full-stack construída para simplificar a divisão de despesas em grupo, tornando viagens, eventos e a vida em república mais fáceis e transparentes.

## 🚀 O Problema Resolvido

Quem nunca viajou com amigos ou morou com outras pessoas e se perdeu na hora de acertar as contas? A confusão de "quem pagou o quê?" e "quem deve a quem?" é constante e pode criar situações desconfortáveis. O SettleUp foi criado para eliminar essa confusão, centralizando todas as despesas de um grupo e calculando automaticamente a forma mais simples de todos ficarem quites.

## ✨ Funcionalidades Principais

* **Autenticação Segura:** Sistema completo de registo e login de utilizadores com tokens de acesso JWT.
* **Gestão de Grupos:** Crie grupos para diferentes eventos (viagens, moradia, etc.) e convide membros através de um código de convite único.
* **Registo de Despesas:** Qualquer membro pode adicionar uma despesa, especificando o valor, a descrição e quem participou na divisão.
* **Balanço Inteligente:** O sistema calcula automaticamente quem deve a quem, exibindo um resumo claro e os pagamentos sugeridos para acertar as contas.
* **Gestão Completa (CRUD):** Utilizadores podem criar, visualizar, editar e excluir as suas despesas e grupos (com autorização para exclusão apenas para o criador).

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com uma stack moderna e robusta, demonstrando competências em todo o ciclo de desenvolvimento.

**Frontend:**
* **React** com **Vite**
* **TypeScript**
* **Material-UI (MUI)** para a biblioteca de componentes
* **React Router** para o roteamento
* **React Context API** para a gestão de estado de autenticação

**Backend:**
* **Node.js** com **Express**
* **TypeScript**
* **Prisma** como ORM para a interação com o banco de dados
* **PostgreSQL** como banco de dados relacional
* **JWT (JSON Web Tokens)** para autenticação
* **bcrypt.js** para a encriptação de senhas

**Ambiente de Desenvolvimento:**
* **Docker** e **Docker Compose** para criar um ambiente de banco de dados isolado e consistente.

---

## 🚀 Como Iniciar o Projeto Localmente

Siga os passos abaixo para configurar e rodar o projeto na sua máquina.

### Pré-requisitos

* [Git](https://git-scm.com/)
* [Node.js (versão LTS)](https://nodejs.org/)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Guia de Instalação

1.  **Clone o repositório:**
    
    git clone https://github.com/jguilhermepaiva/SettleUp.git <br/>
    cd SettleUp
    

2.  **Configure o Backend (`server/`):**
    * Navegue para a pasta do servidor: `cd server`
    * Instale as dependências: `npm install`
    * Crie um ficheiro `.env` na pasta `server/` e adicione o seguinte conteúdo:
        
        DATABASE_URL="postgresql://settleup_user:SEU-USER@localhost:5433/settleup_db" <br/>
        JWT_SECRET="SEU-TOKEN-SUPER-SECRETO-PARA-JWT"
        

3.  **Inicie o Banco de Dados:**
    * Volte para a pasta raiz do projeto (`cd ..`).
    * Inicie o contentor do Docker: `docker-compose up -d`
    * Aguarde alguns segundos.

4.  **Prepare o Banco de Dados:**
    * Navegue de volta para a pasta do servidor: `cd server`
    * Execute o comando `migrate reset` para criar as tabelas do zero:
        
        npx prisma migrate reset
        
        *(Confirme com `y` quando solicitado)*

5.  **Configure o Frontend (`client/`):**
    * Abra um **novo terminal**.
    * Navegue para a pasta do cliente: `cd client`
    * Instale as dependências: `npm install`

6.  **Inicie a Aplicação:**
    * **No terminal do backend (`server/`):**
        
        npm run dev
        
        *(O servidor estará a rodar em `http://localhost:3001`)*

    * **No terminal do frontend (`client/`):**
        
        npm run dev
        
        *(A aplicação estará acessível em `http://localhost:5173` ou outra porta indicada)*

7.  **Primeiro Uso:**
    * Abra o endereço do frontend no seu navegador. Como o banco de dados é novo, você precisará **registar um novo utilizador** para começar.

---

### Scripts Disponíveis

* `npm run dev`: Inicia o servidor de desenvolvimento (tanto no cliente quanto no servidor).
* `npx prisma studio`: Abre a interface visual do Prisma para interagir com o banco de dados (deve ser executado na pasta `server/`).
