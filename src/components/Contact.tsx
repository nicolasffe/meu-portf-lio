import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "seu@email.com",
      link: "mailto:seu@email.com",
      color: "from-red-500 to-orange-500",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Telefone",
      value: "+55 (11) 99999-9999",
      link: "tel:+5511999999999",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Localização",
      value: "São Paulo, Brasil",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
      url: "https://github.com/seuusuario",
      color: "hover:bg-gray-100",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      url: "https://linkedin.com/in/seuusuario",
      color: "hover:bg-blue-50",
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 mb-4"
          >
            <Send className="h-8 w-8 text-white" />
          </motion.div>
          
          <h2 className="mb-4">Entre em Contato</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Estou sempre aberto a novas oportunidades e colaborações. Sinta-se à vontade para entrar em contato!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 relative overflow-hidden group">
                <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <CardContent className="pt-6 relative">
                  <div className="flex flex-col items-center text-center gap-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`p-3 rounded-full bg-gradient-to-br ${info.color}`}
                    >
                      <div className="text-white">
                        {info.icon}
                      </div>
                    </motion.div>
                    
                    <div>
                      <div className="text-muted-foreground mb-1">
                        {info.label}
                      </div>
                      {info.link ? (
                        <a 
                          href={info.link} 
                          className="hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div>{info.value}</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5" />
            
            <CardContent className="pt-8 pb-8 relative">
              <div className="text-center">
                <p className="mb-6">Me encontre nas redes sociais:</p>
                <div className="flex gap-4 justify-center flex-wrap">
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        variant="outline" 
                        asChild 
                        className={`${social.color} transition-all duration-300 border-2 hover:border-primary/50`}
                      >
                        <a href={social.url} target="_blank" rel="noopener noreferrer">
                          {social.icon}
                          <span className="ml-2">{social.label}</span>
                        </a>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
