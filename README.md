# SettleUp 💸

Bem-vindo ao SettleUp! Uma aplicação full-stack construída para simplificar a divisão de despesas em grupo, tornando viagens, eventos e a vida em república mais fáceis e transparentes.


---

## 🔗 Acesso ao Projeto (Deploy)

A aplicação está totalmente funcional e hospedada na nuvem.

* **Frontend (Vercel):** <a href="https://seu-link-do-vercel.app" target="_blank" rel="noopener noreferrer">**Aceda à aplicação aqui!**</a>
* **Backend (Render):** <a href="https://seu-link-do-render.com" target="_blank" rel="noopener noreferrer">Link da API</a>

**Nota Importante:** O backend está hospedado no plano gratuito do Render e "adormece" após um período de inatividade. Ao aceder à aplicação pela primeira vez, a primeira tentativa de login ou registo pode falhar. **Para "acordar" o servidor, basta clicar no link da API acima.** Aguarde até ver uma mensagem de sucesso (ou um erro, o importante é que responda) e, em seguida, a aplicação frontend funcionará perfeitamente.

---

## 🚀 Sobre o Projeto

Este projeto resolve o problema comum de gerir e dividir despesas em grupo. Seja numa viagem com amigos, nas contas mensais de uma república ou na organização de um evento, o SettleUp elimina a confusão de "quem pagou o quê?" e "quem deve a quem?", calculando automaticamente a forma mais simples de todos ficarem quites.

## ✨ Funcionalidades Principais

* **Autenticação Segura:** Sistema completo de registo e login com tokens de acesso JWT.
* **Gestão de Grupos:** Crie grupos, convide membros através de um código único, e exclua grupos (apenas o criador).
* **Gestão de Despesas:** Adicione, visualize, edite e exclua despesas dentro de um grupo, especificando quem participou.
* **Balanço Inteligente:** O sistema calcula e exibe um resumo financeiro claro, mostrando quem deve a quem para acertar as contas.
* **Interface Moderna:** Construída com React e Material-UI para uma experiência de utilizador limpa e reativa.

## 🛠️ Tecnologias Utilizadas

**Backend:**
* **Node.js** com o framework **Express**
* **TypeScript**
* **Prisma** como ORM para a interação com o banco de dados
* **PostgreSQL** como banco de dados relacional
* **JWT (jsonwebtoken)** e **bcrypt.js** para autenticação e segurança de senhas

**Frontend:**
* **React** com **Vite**
* **TypeScript**
* **Material-UI (MUI)** para a biblioteca de componentes
* **React Router** para o roteamento
* **React Context API** para a gestão de estado de autenticação

**Deploy & Ambiente:**
* **Backend:** Hospedado no **Render**.
* **Banco de Dados:** PostgreSQL hospedado no **Render**.
* **Frontend:** Hospedado no **Vercel**.
* **Docker** e **Docker Compose** para o ambiente de desenvolvimento local.

---

## 🚀 Como Iniciar o Projeto Localmente

Siga os passos abaixo para configurar e rodar o projeto na sua máquina.

### Pré-requisitos

* [Git](https://git-scm.com/)
* [Node.js (versão LTS)](https://nodejs.org/)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Guia de Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/SettleUp.git](https://github.com/seu-usuario/SettleUp.git)
    cd SettleUp
    ```

2.  **Configure o Backend (`server/`):**
    * Navegue para a pasta do servidor: `cd server`
    * Instale as dependências: `npm install`
    * Crie um ficheiro `.env` na pasta `server/` e adicione o seguinte conteúdo:
        ```env
        DATABASE_URL="postgresql://settleup_user:supersecret@localhost:5433/settleup_db"
        JWT_SECRET="seu-segredo-super-secreto-para-jwt"
        ```

3.  **Inicie o Banco de Dados:**
    * Volte para a pasta raiz do projeto (`cd ..`).
    * Inicie o contentor do Docker: `docker-compose up -d`
    * Aguarde cerca de 20 segundos.

4.  **Prepare o Banco de Dados:**
    * Navegue de volta para a pasta do servidor: `cd server`
    * Execute o comando `migrate reset` para criar as tabelas do zero:
        ```bash
        npx prisma migrate reset
        ```
        *(Confirme com `y` quando solicitado)*

5.  **Configure o Frontend (`client/`):**
    * Abra um **novo terminal**.
    * Navegue para a pasta do cliente: `cd client`
    * Instale as dependências: `npm install`

6.  **Inicie a Aplicação:**
    * **No terminal do backend (`server/`):**
        ```bash
        npm run dev
        ```
        *(O servidor estará a rodar em `http://localhost:3001`)*

    * **No terminal do frontend (`client/`):**
        ```bash
        npm run dev
        ```
        *(A aplicação estará acessível em `http://localhost:5173` ou outra porta indicada)*

7.  **Primeiro Uso:**
    * Abra o endereço do frontend no seu navegador. Como o banco de dados é novo, você precisará de **registar um novo utilizador** para começar.
