import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Certificates } from "./components/Certificates";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";

export default function App() {
  return (
    <div className="size-full">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Certificates />
        <Skills />
        <Contact />
      </main>
      <footer className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>© 2025 Nícolas Ferreira Fernandes. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
