import { Code, Database, Palette, Server } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  id: number;
  title: string;
  icon: string; 
  skills: Skill[];
  color: string;
}

const icons: { [key: string]: React.ReactNode } = {
  Code: <Code className="h-6 w-6" />,
  Server: <Server className="h-6 w-6" />,
  Database: <Database className="h-6 w-6" />,
  Palette: <Palette className="h-6 w-6" />,
};

function AnimatedProgress({ value, delay = 0 }: { value: number; delay?: number }) {
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      setProgress(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isInView, value, delay]);

  return (
    <div ref={ref}>
      <Progress 
        value={progress} 
        className="h-2 transition-all duration-1000 ease-out" 
      />
    </div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/skills')
      .then(response => response.json())
      .then(data => setSkillCategories(data))
      .catch(error => console.error('Erro ao buscar habilidades:', error));
  }, []);

  return (
    <section id="skills" className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="mb-4">Habilidades</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tecnologias e ferramentas que domino ou estou aprendendo
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 relative overflow-hidden group">
                {/* Animated gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <CardHeader className="relative">
                  <CardTitle className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                      className={`text-primary bg-gradient-to-br ${category.color} p-2 rounded-lg bg-clip-border`}
                    >
                      <div className="text-white">
                        {icons[category.icon]}
                      </div>
                    </motion.div>
                    <span className="group-hover:text-primary transition-colors">
                      {category.title}
                    </span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative">
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ 
                          duration: 0.3, 
                          delay: categoryIndex * 0.1 + skillIndex * 0.05 
                        }}
                      >
                        <div className="flex justify-between mb-2">
                          <span>{skill.name}</span>
                          <motion.span 
                            className="text-muted-foreground"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.5 }}
                          >
                            {skill.level}%
                          </motion.span>
                        </div>
                        <AnimatedProgress 
                          value={skill.level} 
                          delay={categoryIndex * 100 + skillIndex * 50}
                        />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}