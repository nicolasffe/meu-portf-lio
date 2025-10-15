import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card, CardContent } from "./ui/card";
import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(countRef, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <div ref={countRef}>{count}+</div>;
}

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          Sobre Mim
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-2 md:order-1"
          >
            <p className="mb-6 text-muted-foreground">
              Sou estudante do terceiro semestre de <strong>Análise e Desenvolvimento de Sistemas (ADS)</strong> em Fatec, com grande interesse em desenvolvimento de software, especialmente em <strong>desenvolvimento web com JavaScript/TypeScript</strong> e na criação de sistemas robustos com <strong>Python</strong>.
            </p>
            <p className="mb-6 text-muted-foreground">
                Durante minha jornada, venho aprofundando meus conhecimentos em tecnologias de DevOps como <strong>Docker e Kubernetes</strong> e explorando estruturas de dados complexas. Busco sempre conectar a teoria com projetos práticos para criar soluções eficientes e modernas.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 10, label: "Projetos" },
                { value: 5, label: "Certificados" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
                          <AnimatedCounter end={stat.value} />
                        </div>
                        <p className="text-muted-foreground">{stat.label}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-1 md:order-2"
          >
            <div className="relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="aspect-square rounded-2xl overflow-hidden border-2 border-primary/20 shadow-xl relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 mix-blend-overlay z-10" />
                <ImageWithFallback
                  src=""
                  alt="Foto de perfil"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary to-purple-600 rounded-full blur-2xl opacity-50 -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full blur-2xl opacity-50 -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
