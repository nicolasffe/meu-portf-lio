import { Award, Calendar, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialUrl?: string;
}

export function Certificates() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/certificates')
      .then(response => response.json())
      .then(data => setCertificates(data))
      .catch(error => console.error('Erro ao buscar certificados:', error));
  }, []);

  return (
    <section id="certificates" className="py-20 px-4 bg-gradient-to-b from-background via-purple-50/30 to-background">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="mb-4">Certificados</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cursos e certificações que complementam minha formação acadêmica
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {certificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 relative overflow-hidden group">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardHeader className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Award className="h-5 w-5 text-primary" />
                        </motion.div>
                        {certificate.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {certificate.issuer}
                      </CardDescription>
                    </div>
                    {certificate.credentialUrl && (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10">
                          <a href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="relative">
                  <p className="text-muted-foreground mb-3">
                    {certificate.description}
                  </p>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{certificate.date}</span>
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