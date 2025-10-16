// src/server/index.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3001; // Usaremos uma porta diferente do frontend (Vite)

// Configurar o EJS como o motor de visualização
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/home', (req, res) => {
  const data = {
    title: 'Página Inicial',
    message: 'Olá, mundo! Usando EJS com Express.'
  };
  res.render('home', data);
});
// Middleware para analisar o corpo das requisições JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de exemplo para testar o servidor
app.get('/api', (req, res) => {
  res.json({ message: 'Bem-vindo à API do portfólio!' });
});

app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
});

let projects = [
  // Dados de exemplo, como no seu componente Projects.tsx
  { id: 1, title: "Sistema de Gerenciamento Acadêmico", description: "Aplicação web para gerenciar notas...", technologies: ["React", "TypeScript", "Node.js"] },
  { id: 2, title: "App de Estudos Colaborativo", description: "Plataforma para estudantes compartilharem materiais...", technologies: ["Vue.js", "Firebase", "Tailwind"] }
];

// GET: Obter todos os projetos
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// POST: Criar um novo projeto
app.post('/api/projects', (req, res) => {
  const newProject = {
    id: projects.length + 1,
    title: req.body.title,
    description: req.body.description,
    technologies: req.body.technologies || []
  };
  projects.push(newProject);
  res.status(201).json(newProject);
});

// PUT: Atualizar um projeto existente
app.put('/api/projects/:id', (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  const projectIndex = projects.findIndex(p => p.id === projectId);

  if (projectIndex !== -1) {
    projects[projectIndex] = { ...projects[projectIndex], ...req.body };
    res.json(projects[projectIndex]);
  } else {
    res.status(404).json({ message: 'Projeto não encontrado' });
  }
});

// DELETE: Excluir um projeto
app.delete('/api/projects/:id', (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  const initialLength = projects.length;
  projects = projects.filter(p => p.id !== projectId);

  if (projects.length < initialLength) {
    res.status(204).send(); // No content
  } else {
    res.status(404).json({ message: 'Projeto não encontrado' });
  }
});