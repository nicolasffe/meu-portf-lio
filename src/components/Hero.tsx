import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 pt-16 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 -z-10 h-full w-full" aria-hidden="true"> 
      <div className="absolute top-0 left-0 h-full w-full bg-background" />
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute bottom-0 left-0 h-1/2 w-full bg-[radial-gradient(ellipse_50%_50%_at_50%_100%,rgba(14,165,233,0.1),transparent)]" aria-hidden="true"/>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-4 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full"
          >
            <span className="text-primary">👋 Bem-vindo ao meu portfólio</span>
          </motion.div>
         
          <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-4 text-4xl font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]">
            Olá, eu sou o Nícolas
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-muted-foreground mb-2"
          >
            Estudante de Análise e Desenvolvimento de Sistemas | Desenvolvedor em Formação
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Apaixonado por tecnologia e inovação, buscando sempre aprender e criar soluções que façam a diferença.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex gap-4 justify-center mb-8 flex-wrap"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => scrollToSection("projects")}
              className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
            >
              Ver Projetos
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" onClick={() => scrollToSection("contact")}>
              Entre em Contato
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex gap-4 justify-center"
        >
          {[
            { icon: Github, href: "https://github.com/nicolasffe" },
            { icon: Linkedin, href: "https://linkedin.com/in/seuusuario" },
            { icon: Mail, href: "mailto:seu@email.com" },
          ].map((social, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 hover:text-primary"
                asChild
              >
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  <social.icon className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1 },
          y: { repeat: Infinity, duration: 2 },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => scrollToSection("about")}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span className="text-sm">Scroll</span>
          <ArrowDown className="h-5 w-5" />
        </div>
      </motion.div>
    </section>
  );
}
