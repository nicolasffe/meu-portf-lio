// src/server/index.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar o EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// --- Rota de Teste e Página EJS ---
app.get('/home', (req, res) => {
  const data = {
    title: 'Página Inicial',
    message: 'Olá, mundo! Usando EJS com Express.'
  };
  res.render('home', data);
});

app.get('/api', (req, res) => {
  res.json({ message: 'Bem-vindo à API do portfólio!' });
});

// --- DADOS EM MEMÓRIA (com exemplos) ---

let projects = [
  { 
    id: 1, 
    title: "Sistema de Gerenciamento Acadêmico", 
    description: "Aplicação web para gerenciar notas, frequência e atividades acadêmicas com interface intuitiva.", 
    image: "https://images.unsplash.com/photo-1569693799105-4eb645d89aea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9qZWN0JTIwbGFwdG9wfGVufDF8fHx8MTc2MDQ3NTYwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    technologies: ["React", "TypeScript", "Node.js"],
    githubUrl: "https://github.com/seuusuario/projeto1",
    liveUrl: "https://projeto1.demo.com",
  },
  { 
    id: 2, 
    title: "App de Estudos Colaborativo", 
    description: "Plataforma para estudantes compartilharem materiais, formar grupos de estudo e tirar dúvidas.", 
    image: "https://images.unsplash.com/photo-1737737351943-82e01f866e53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMHNjcmVlbnxlbnwxfHx8fDE3NjAzNjkxNDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    technologies: ["Vue.js", "Firebase", "Tailwind"],
    githubUrl: "https://github.com/seuusuario/projeto2",
  }
];

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

// --- ROTAS DA API PARA PROJETOS ---

app.get('/api/projects', (req, res) => res.json(projects));

app.post('/api/projects', (req, res) => {
  const newProject = { id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1, ...req.body };
  projects.push(newProject);
  res.status(201).json(newProject);
});

app.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const index = projects.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    projects[index] = { ...projects[index], ...req.body };
    res.json(projects[index]);
  } else {
    res.status(404).json({ message: 'Projeto não encontrado' });
  }
});

app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = projects.length;
  projects = projects.filter(p => p.id !== parseInt(id));
  if (projects.length < initialLength) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Projeto não encontrado' });
  }
});

// --- ROTAS DA API PARA CERTIFICADOS ---

app.get('/api/certificates', (req, res) => res.json(certificates));

app.post('/api/certificates', (req, res) => {
  const newCertificate = { id: certificates.length > 0 ? Math.max(...certificates.map(c => c.id)) + 1 : 1, ...req.body };
  certificates.push(newCertificate);
  res.status(201).json(newCertificate);
});

app.put('/api/certificates/:id', (req, res) => {
  const { id } = req.params;
  const index = certificates.findIndex(c => c.id === parseInt(id));
  if (index !== -1) {
    certificates[index] = { ...certificates[index], ...req.body };
    res.json(certificates[index]);
  } else {
    res.status(404).json({ message: 'Certificado não encontrado' });
  }
});

app.delete('/api/certificates/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = certificates.length;
  certificates = certificates.filter(c => c.id !== parseInt(id));
  if (certificates.length < initialLength) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Certificado não encontrado' });
  }
});

// --- ROTAS DA API PARA HABILIDADES (SKILLS) ---

app.get('/api/skills', (req, res) => res.json(skillCategories));

app.post('/api/skills', (req, res) => {
  const newSkillCategory = { id: skillCategories.length > 0 ? Math.max(...skillCategories.map(s => s.id)) + 1 : 1, ...req.body };
  skillCategories.push(newSkillCategory);
  res.status(201).json(newSkillCategory);
});

app.put('/api/skills/:id', (req, res) => {
  const { id } = req.params;
  const index = skillCategories.findIndex(s => s.id === parseInt(id));
  if (index !== -1) {
    skillCategories[index] = { ...skillCategories[index], ...req.body };
    res.json(skillCategories[index]);
  } else {
    res.status(404).json({ message: 'Categoria de habilidade não encontrada' });
  }
});

app.delete('/api/skills/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = skillCategories.length;
  skillCategories = skillCategories.filter(s => s.id !== parseInt(id));
  if (skillCategories.length < initialLength) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Categoria de habilidade não encontrada' });
  }
});

// --- INICIAR O SERVIDOR ---
app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
});