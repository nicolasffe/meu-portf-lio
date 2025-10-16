// src/server/index.js
const express = require('express');
const path = require('path');
const cors = require('cors'); // Importa o pacote cors
const app = express();
const port = 3001;

app.use(cors()); // Habilita o CORS para todas as rotas

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

// --- DADOS DOS PROJETOS ---
let projects = [
  { id: 1, title: "Sistema de Gerenciamento Acadêmico", description: "Aplicação web para gerenciar notas...", technologies: ["React", "TypeScript", "Node.js"] },
  { id: 2, title: "App de Estudos Colaborativo", description: "Plataforma para estudantes compartilharem materiais...", technologies: ["Vue.js", "Firebase", "Tailwind"] },
  {
    id: 3,
    title: "Plataforma de E-commerce para Livros",
    description: "Uma loja online completa para venda de livros, com carrinho de compras, sistema de avaliação e painel administrativo.",
    image: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rc3RvcmV8ZW58MXx8fHwxNzYwNDc1NjA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    technologies: ["Node.js", "Express", "EJS", "MongoDB"],
    githubUrl: "https://github.com/seuusuario/ecommerce-livros",
    liveUrl: "https://livraria-demo.com"
  }
];

// --- DADOS DOS CERTIFICADOS ---
let certificates = [
    {
      id: 1,
      title: "Desenvolvimento Web Full Stack",
      issuer: "Udemy",
      date: "Outubro 2024",
      description: "Curso completo de desenvolvimento web com React, Node.js e bancos de dados.",
      credentialUrl: "https://udemy.com/certificate/exemplo",
    },
    {
      id: 2,
      title: "Python para Ciência de Dados",
      issuer: "Coursera",
      date: "Agosto 2024",
      description: "Fundamentos de análise de dados com Python, Pandas e NumPy.",
      credentialUrl: "https://coursera.org/certificate/exemplo",
    },
    {
      id: 3,
      title: "Fundamentos de UX/UI Design",
      issuer: "Google",
      date: "Junho 2024",
      description: "Princípios de design de interface e experiência do usuário.",
    },
];

// --- DADOS DAS HABILIDADES ---
let skillCategories = [
    {
      id: 1,
      title: "Frontend",
      icon: "Code",
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "HTML/CSS", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "React", level: 80 },
        { name: "TypeScript", level: 75 },
      ],
    },
    {
      id: 2,
      title: "Backend",
      icon: "Server",
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "Node.js", level: 75 },
        { name: "Python", level: 80 },
        { name: "Java", level: 70 },
        { name: "API REST", level: 85 },
      ],
    },
    {
      id: 3,
      title: "Banco de Dados",
      icon: "Database",
      color: "from-orange-500 to-red-500",
      skills: [
        { name: "MySQL", level: 80 },
        { name: "PostgreSQL", level: 75 },
        { name: "MongoDB", level: 70 },
      ],
    },
    {
      id: 4,
      title: "Design & Outros",
      icon: "Palette",
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "Figma", level: 75 },
        { name: "Git/GitHub", level: 85 },
        { name: "Tailwind CSS", level: 80 },
      ],
    },
];


// --- ROTAS DA API ---

// GET: Obter todos os projetos
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// GET: Obter todos os certificados
app.get('/api/certificates', (req, res) => {
  res.json(certificates);
});

// GET: Obter todas as habilidades
app.get('/api/skills', (req, res) => {
  res.json(skillCategories);
});


// --- ROTAS DE MANIPULAÇÃO DE DADOS (POST, PUT, DELETE) ---

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