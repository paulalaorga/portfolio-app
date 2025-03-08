"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

// Interfaces para datos
interface ProjectData {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

interface ExperienceData {
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}

// Componente de Sección
interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

const Section = ({
  id,
  title,
  subtitle,
  children,
  className = "",
}: SectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className={`py-16 ${className}`} ref={ref} id={id}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
          <span className="text-primary">#</span> {title}
        </h2>
        {subtitle && <p className="text-lg text-white/60 mb-8">{subtitle}</p>}
        <div className="mt-10">{children}</div>
      </motion.div>
    </section>
  );
};

// Componente para proyectos
const ProjectCard = ({
  project,
  index,
}: {
  project: ProjectData;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="bg-black/40 border border-primary/30 hover:border-primary/80 rounded-lg overflow-hidden flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, boxShadow: "0 8px 30px rgba(0, 240, 255, 0.3)" }}
    >
      <div className="h-48 relative">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-primary">{project.title}</h3>
        <p className="text-white/70 mb-4 flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full border border-primary/30"
            >
              {tag}
            </span>
          ))}
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors text-sm flex items-center gap-1"
          >
            <span>Ver proyecto</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  );
};

// Componente para experiencia laboral
const ExperienceCard = ({
  experience,
  index,
}: {
  experience: ExperienceData;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="bg-black/40 border-l-2 border-primary pl-5 py-4 relative mb-8"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-6"></div>
      <h3 className="text-xl font-bold text-white">{experience.title}</h3>
      <div className="flex justify-between items-center mb-2">
        <span className="text-secondary">{experience.company}</span>
        <span className="text-white/50 text-sm">{experience.period}</span>
      </div>
      <p className="text-white/70 mb-4">{experience.description}</p>
      <div className="flex flex-wrap gap-2">
        {experience.skills.map((skill, i) => (
          <span
            key={i}
            className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full border border-secondary/30"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

// Componente para contacto
const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulación de envío
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setName("");
      setEmail("");
      setMessage("");

      // Resetear el estado después de unos segundos
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="grid md:grid-cols-2 gap-12 items-start">
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">Hablemos</h3>
        <p className="text-white/70 mb-6">
          Estoy interesada en{" "}
          <span className="text-primary">colaboraciones</span> y
          <span className="text-secondary"> nuevas oportunidades</span>. Si
          tienes alguna pregunta o quieres hablar sobre un proyecto, ¡no dudes
          en contactarme!
        </p>

        <div className="flex flex-col space-y-4">
          <a
            href="mailto:paulalaorga@gmail.com"
            className="flex items-center gap-3 text-white/70 hover:text-primary transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            paulalaorga@gmail.com
          </a>

          <a
            href="https://linkedin.com/in/paulalaorga/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-white/70 hover:text-primary transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            linkedin.com/in/paulalaorga
          </a>

          <a
            href="https://github.com/paulalaorga"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-white/70 hover:text-primary transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.374 0 0 5.373 0 12C0 17.302 3.438 21.8 8.207 23.387C8.806 23.498 9 23.126 9 22.81V20.576C5.662 21.302 4.967 19.16 4.967 19.16C4.421 17.773 3.634 17.404 3.634 17.404C2.545 16.659 3.717 16.675 3.717 16.675C4.922 16.759 5.556 17.912 5.556 17.912C6.626 19.746 8.363 19.216 9.048 18.909C9.155 18.134 9.466 17.604 9.81 17.305C7.145 17 4.343 15.971 4.343 11.374C4.343 10.063 4.812 8.993 5.579 8.153C5.455 7.85 5.044 6.629 5.696 4.977C5.696 4.977 6.704 4.655 8.997 6.207C9.954 5.941 10.98 5.808 12 5.803C13.02 5.808 14.047 5.941 15.006 6.207C17.297 4.655 18.303 4.977 18.303 4.977C18.956 6.63 18.545 7.851 18.421 8.153C19.191 8.993 19.656 10.064 19.656 11.374C19.656 15.983 16.849 16.998 14.177 17.295C14.607 17.667 15 18.397 15 19.517V22.81C15 23.129 15.192 23.504 15.801 23.386C20.566 21.797 24 17.3 24 12C24 5.373 18.627 0 12 0Z" />
            </svg>
            github.com/paulalaorga
          </a>

          <a
            href="tel:+34606452632"
            className="flex items-center gap-3 text-white/70 hover:text-primary transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 21 16.92z"></path>
            </svg>
            +34 606 452 632
          </a>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-black/40 p-6 rounded-lg border border-primary/30"
      >
        <h3 className="text-2xl font-bold text-white mb-4">
          Envíame un mensaje
        </h3>

        <div className="mb-4">
          <label htmlFor="name" className="block text-white/70 mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-black/60 border border-primary/30 rounded px-4 py-2 text-white focus:outline-none focus:border-primary"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-white/70 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-black/60 border border-primary/30 rounded px-4 py-2 text-white focus:outline-none focus:border-primary"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-white/70 mb-2">
            Mensaje
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            className="w-full bg-black/60 border border-primary/30 rounded px-4 py-2 text-white focus:outline-none focus:border-primary"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-primary text-black font-bold hover:bg-primary/80 transition-colors rounded w-full flex items-center justify-center"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Enviando...
            </span>
          ) : (
            "Enviar mensaje"
          )}
        </button>

        {submitStatus === "success" && (
          <p className="mt-4 text-green-400 bg-green-400/10 border border-green-400/30 rounded p-3">
            ¡Mensaje enviado correctamente! Me pondré en contacto contigo
            pronto.
          </p>
        )}

        {submitStatus === "error" && (
          <p className="mt-4 text-red-400 bg-red-400/10 border border-red-400/30 rounded p-3">
            Ha habido un problema al enviar el mensaje. Por favor, inténtalo de
            nuevo.
          </p>
        )}
      </form>
    </div>
  );
};

// Componente Principal
export default function GridPortfolio() {
  // Referencia para el desplazamiento hacia la sección de proyectos

  // Función para desplazamiento suave a secciones
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Datos para proyectos
  const projects: ProjectData[] = [
    {
      id: "art-history",
      title: "Art History App",
      description:
        "Aplicación interactiva para explorar períodos artísticos históricos y obras representativas.",
      image: "/projects/art-history-app.jpg",
      tags: ["Vue.js", "REST API", "Render"],
      link: "https://art-history-app.onrender.com/#/",
    },
    {
      id: "shopping-list",
      title: "Shopping List App",
      description:
        "Herramienta de lista de compras personalizada con integración de recetas del lado del servidor.",
      image: "/projects/shopping-list-app.jpg",
      tags: ["React.js", "REST API", "GitHub Pages"],
      link: "https://paulalaorga.github.io/phase2-project/",
    },
    {
      id: "ecommerce",
      title: "E-commerce UI",
      description:
        "Desarrollo de interfaces para plataforma de comercio electrónico con Magento, optimizando la experiencia de usuario y rendimiento.",
      image: "/projects/ecommerce-ui.jpg",
      tags: ["Magento", "PHP", "HTML5", "CSS3", "JavaScript"],
      link: "#",
    },
    {
      id: "ai-factory",
      title: "AI Factory Dashboard",
      description:
        "Interfaz escalable construida con Next.js y TypeScript para visualización de datos y gestión de aplicaciones AI.",
      image: "/projects/ai-factory.jpg",
      tags: ["Next.js", "TypeScript", "Tremor", "AWS Amplify"],
      link: "#",
    },
  ];

  // Datos de experiencia
  const experiences: ExperienceData[] = [
    {
      title: "Front-End Developer",
      company: "Factory AI",
      period: "Abr '24 - Oct '24",
      description:
        "Desarrollé interfaces escalables con Next.js (TypeScript) y Tremor, integrando servicios backend con AWS Amplify y GraphQL.",
      skills: [
        "Next.js",
        "TypeScript",
        "Tremor",
        "AWS Amplify",
        "GraphQL",
        "Vercel",
      ],
    },
    {
      title: "Web Developer",
      company: "King Living",
      period: "Ago '23 - Ago '24",
      description:
        "Implementé soluciones eCommerce con Magento (PHP), mejorando interfaces con HTML5, CSS3 y JavaScript, asegurando compatibilidad cross-browser.",
      skills: ["Magento", "PHP", "HTML5", "CSS3", "JavaScript"],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <header className="flex justify-between items-center py-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 relative">
            <Image
              src="/logo-pl.png"
              alt="PL Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-mono text-white">
            <span className="text-primary">Paula</span> Laorga
            <span className="text-secondary animate-pulse">_</span>
          </h1>
        </div>

        <nav className="hidden md:block">
          <ul className="flex gap-8">
            <li>
              <button
                onClick={() => scrollToSection("about")}
                className="text-white hover:text-primary transition-colors"
              >
                Sobre Mí
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("experience")}
                className="text-white hover:text-primary transition-colors"
              >
                Experiencia
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-white hover:text-primary transition-colors"
              >
                Proyectos
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-white hover:text-primary transition-colors"
              >
                Contacto
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="min-h-[80vh] flex items-center py-20">
        <div className="max-w-3xl">
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Paula <span className="text-primary">Laorga</span>
          </motion.h1>

          <motion.h2
            className="text-2xl md:text-3xl text-white/70 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Front-End Developer
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-white/70 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Creando interfaces intuitivas con una perspectiva integral de
            <span className="text-primary"> comunicación</span> y
            <span className="text-secondary"> marketing digital</span>.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="px-6 py-3 bg-primary text-black font-bold hover:bg-primary/80 transition-colors rounded"
            >
              Ver proyectos
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-3 border border-white/30 text-white hover:border-primary hover:text-primary transition-colors rounded"
            >
              Contacto
            </button>
          </motion.div>
        </div>
      </div>

      {/* About Section */}
      <Section
        id="about"
        title="Sobre mí"
        subtitle="Un vistazo a mi background y habilidades"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-white/70 mb-4">
              Con un background en{" "}
              <span className="text-primary">Comunicación Corporativa</span>,
              <span className="text-secondary"> Marketing Digital</span> y{" "}
              <span className="text-primary">Media</span>, aporto una
              perspectiva integral al{" "}
              <span className="text-secondary">Desarrollo Front-End</span>.
            </p>
            <p className="text-white/70 mb-4">
              Especializada en branding, storytelling y métricas de rendimiento,
              creo interfaces intuitivas y de alto rendimiento.
            </p>
            <p className="text-white/70 mb-6">
              Apasionada por el aprendizaje continuo e impulsada por los
              resultados, estoy ansiosa por contribuir de manera significativa a
              proyectos innovadores.
            </p>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 text-primary">
                Habilidades Técnicas
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/30">
                  HTML5
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/30">
                  CSS
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/30">
                  JavaScript
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/30">
                  TypeScript
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/30">
                  React
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/30">
                  Vue.js
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/30">
                  Next.js
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/30">
                  Tailwind
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/30">
                  Bootstrap
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/30">
                  Sass
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/30">
                  Node.js
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/30">
                  APIs
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/30">
                  GraphQL
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-primary">Idiomas</h3>
              <div className="flex flex-wrap gap-4">
                <div>
                  <p className="text-white font-bold">English</p>
                  <p className="text-white/70 text-sm">
                    Professional Proficiency (C2)
                  </p>
                </div>
                <div>
                  <p className="text-white font-bold">Spanish</p>
                  <p className="text-white/70 text-sm">Native</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative h-[400px] rounded-xl overflow-hidden border-2 border-primary/30">
              <Image
                src="/about-image.jpg"
                alt="Paula Laorga - Front-End Developer"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Experience Section */}
      <Section
        id="experience"
        title="Experiencia"
        subtitle="Mi trayectoria profesional"
        className="bg-black/20 -mx-4 px-4"
      >
        <div className="max-w-3xl mx-auto">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} index={index} />
          ))}
        </div>
      </Section>

      {/* Projects Section */}
      <Section
        title="Proyectos"
        subtitle="Una selección de mis trabajos recientes"
        id="projects"
      >
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://github.com/paulalaorga"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-primary/50 text-primary hover:bg-primary/10 transition-all rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.374 0 0 5.373 0 12C0 17.302 3.438 21.8 8.207 23.387C8.806 23.498 9 23.126 9 22.81V20.576C5.662 21.302 4.967 19.16 4.967 19.16C4.421 17.773 3.634 17.404 3.634 17.404C2.545 16.659 3.717 16.675 3.717 16.675C4.922 16.759 5.556 17.912 5.556 17.912C6.626 19.746 8.363 19.216 9.048 18.909C9.155 18.134 9.466 17.604 9.81 17.305C7.145 17 4.343 15.971 4.343 11.374C4.343 10.063 4.812 8.993 5.579 8.153C5.455 7.85 5.044 6.629 5.696 4.977C5.696 4.977 6.704 4.655 8.997 6.207C9.954 5.941 10.98 5.808 12 5.803C13.02 5.808 14.047 5.941 15.006 6.207C17.297 4.655 18.303 4.977 18.303 4.977C18.956 6.63 18.545 7.851 18.421 8.153C19.191 8.993 19.656 10.064 19.656 11.374C19.656 15.983 16.849 16.998 14.177 17.295C14.607 17.667 15 18.397 15 19.517V22.81C15 23.129 15.192 23.504 15.801 23.386C20.566 21.797 24 17.3 24 12C24 5.373 18.627 0 12 0Z" />
            </svg>
            Ver más proyectos en GitHub
          </a>
        </div>
      </Section>

      {/* Contact Section */}
      <Section
        title="Contacto"
        subtitle="¿Tienes un proyecto en mente? Trabajemos juntos"
        id="contact"
      >
        <ContactSection />
      </Section>

      {/* Footer */}
      <motion.footer
        className="mt-20 text-center text-gray-400 text-sm py-8 border-t border-primary/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="mb-3 flex justify-center">
          <div className="w-8 h-8 relative">
            <Image
              src="/logo-pl.png"
              alt=""
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
        </div>
        <p>© {new Date().getFullYear()} Paula Laorga</p>
        <p className="mt-1">
          Diseñado y desarrollado con <span className="text-secondary">♥</span>
        </p>
      </motion.footer>
    </div>
  );
}
