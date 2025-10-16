Meu Portfólio Digital
Este é um projeto de portfólio acadêmico e profissional, desenvolvido como uma aplicação full-stack moderna. Ele serve como uma ferramenta de apresentação para exibir a trajetória educacional, competências técnicas, certificados e projetos de um desenvolvedor.

O frontend foi construído com React, TypeScript e Vite, utilizando Tailwind CSS e shadcn/ui para uma interface elegante e responsiva. O backend é alimentado por Node.js e Express, com a capacidade de servir dinamicamente o conteúdo das seções do portfólio através de uma API RESTful.

## ✨ Funcionalidades

Conteúdo Dinâmico: As seções de Projetos, Habilidades e Certificados são alimentadas por uma API, permitindo que o conteúdo seja atualizado facilmente sem tocar no código do frontend.

Interface Moderna e Responsiva: Design elegante que se adapta a qualquer tamanho de tela, de telemóveis a desktops.

Animações Interativas: Animações suaves com Framer Motion que melhoram a experiência do utilizador ao navegar pelas seções.

Tema Claro e Escuro: Suporte para temas claro e escuro para preferência do utilizador.

Backend com Express: Um servidor Node.js robusto para gerir e servir os dados do portfólio.

Requisições HTTP Completas: Implementação de todas as operações CRUD (GET, POST, PUT, DELETE) para a gestão de projetos.

🛠️ Tecnologias Utilizadas
O projeto foi construído com as seguintes tecnologias:

Frontend
React

TypeScript

Vite

Tailwind CSS

shadcn/ui (para componentes como Card, Button, Badge)

Framer Motion (para animações)

Lucide React (para ícones)

Backend
Node.js

Express.js

EJS (para renderização do lado do servidor)

CORS (para permitir a comunicação entre frontend e backend)

🚀 Como Começar
Siga os passos abaixo para configurar e executar o projeto localmente.

Pré-requisitos
Node.js (versão 18 ou superior)

npm (geralmente vem com o Node.js)

1. Clonar o Repositório
Bash

git clone https://github.com/seu-usuario/meu-portfolio.git
cd meu-portfolio
2. Instalar as Dependências
Este comando irá instalar todas as dependências necessárias tanto para o frontend quanto para o backend.

Bash

npm install
3. Executar os Servidores
Para que a aplicação funcione corretamente, é necessário executar os dois servidores (frontend e backend) em terminais separados.

a) Iniciar o Servidor Backend (API)

Este servidor irá correr em http://localhost:3001 e fornecer os dados para a aplicação.

Bash

node src/server/index.js
Deverá ver a mensagem Servidor backend rodando em http://localhost:3001 no terminal.

b) Iniciar o Servidor Frontend (React)

Num novo terminal, execute o comando abaixo para iniciar a interface do utilizador.

Bash

npm run dev
A aplicação será aberta automaticamente no seu navegador, geralmente em http://localhost:3000.

⚙️ Personalização
Todo o conteúdo do portfólio (projetos, certificados, habilidades, etc.) é gerido no ficheiro src/server/index.js. Para personalizar com as suas informações, basta editar os arrays neste ficheiro.

Para adicionar os seus projetos: edite o array projects.

Para adicionar os seus certificados: edite o array certificates.

Para adicionar as suas habilidades: edite o array skillCategories.

Após fazer as alterações, reinicie o servidor backend (node src/server/index.js) para que as novas informações sejam exibidas.

📝 Endpoints da API
O servidor Express fornece os seguintes endpoints:

GET /api/projects: Retorna a lista de todos os projetos.

POST /api/projects: Adiciona um novo projeto.

PUT /api/projects/:id: Atualiza um projeto existente.

DELETE /api/projects/:id: Remove um projeto.

GET /api/certificates: Retorna a lista de todos os certificados.

GET /api/skills: Retorna a lista de todas as categorias de habilidades.

📄 Licença
Este projeto é de código aberto. Sinta-se à vontade para o usar como base para o seu próprio portfólio.