"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Palette,
  Database,
  Globe,
  User,
  Briefcase,
  Heart,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ContactForm } from "@/components/contact-form"
import { MobileMenu } from "@/components/mobile-menu"

export default function Portfolio() {
  const { toast } = useToast()
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    // Scroll spy para destacar seção ativa
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Função para scroll suave
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      const navHeight = 80 // Altura da navegação fixa
      const targetPosition = targetElement.offsetTop - navHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  }

  const skills = [
    { name: "React", level: 90, icon: Code },
    { name: "Next.js", level: 85, icon: Globe },
    { name: "TypeScript", level: 80, icon: Code },
    { name: "Node.js", level: 75, icon: Database },
    { name: "UI/UX Design", level: 70, icon: Palette },
    { name: "PostgreSQL", level: 65, icon: Database },
  ]

  const projects = [
    {
      title: "E-commerce Platform",
      description:
        "Plataforma completa de e-commerce com painel administrativo, sistema de pagamentos e gestão de produtos.",
      tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      image: "/placeholder.svg?height=200&width=300",
      github: "#",
      demo: "#",
    },
    {
      title: "Task Management App",
      description: "Aplicativo de gerenciamento de tarefas com colaboração em tempo real e notificações push.",
      tech: ["React", "Node.js", "Socket.io", "MongoDB"],
      image: "/placeholder.svg?height=200&width=300",
      github: "#",
      demo: "#",
    },
    {
      title: "Portfolio Website",
      description: "Site portfólio responsivo com animações suaves e design moderno para um cliente.",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
      image: "/placeholder.svg?height=200&width=300",
      github: "#",
      demo: "#",
    },
  ]

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md border-b border-purple-800/30 z-50">
        <div className="container mx-auto px-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center items-center py-4">
            <div className="flex space-x-8 lg:space-x-12">
              {[
                { id: "home", label: "Início" },
                { id: "about", label: "Sobre" },
                { id: "skills", label: "Habilidades" },
                { id: "projects", label: "Projetos" },
                { id: "contact", label: "Contato" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleSmoothScroll(e, item.id)}
                  className={`relative transition-colors py-2 px-1 group cursor-pointer ${
                    activeSection === item.id ? "text-white" : "text-gray-300 hover:text-purple-400"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transform transition-transform ${
                      activeSection === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></span>
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GS</span>
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-none">Gabriel Santana</div>
                <div className="text-purple-300 text-xs">Full Stack Developer</div>
              </div>
            </div>
            <MobileMenu onNavigate={handleSmoothScroll} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-8 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between min-h-[70vh] md:min-h-[80vh]">
            <div className="w-full lg:w-1/2 space-y-6 md:space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white">Olá, eu sou</span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                    Gabriel Santana
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-lg mx-auto lg:mx-0">
                  Desenvolvedor Full Stack apaixonado por criar experiências digitais incríveis e soluções inovadoras.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
                  onClick={(e) => {
                    e.preventDefault()
                    handleSmoothScroll(e as any, "contact")
                  }}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Entre em Contato
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent w-full sm:w-auto"
                  onClick={(e) => {
                    e.preventDefault()
                    handleSmoothScroll(e as any, "projects")
                  }}
                >
                  <Github className="mr-2 h-4 w-4" />
                  Ver Projetos
                </Button>
              </div>

              <div className="flex space-x-6 justify-center lg:justify-start">
                <Link href="#" className="text-purple-600 hover:text-purple-800 transition-colors">
                  <Github className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-purple-600 hover:text-purple-800 transition-colors">
                  <Linkedin className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-purple-600 hover:text-purple-800 transition-colors">
                  <Mail className="h-6 w-6" />
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 mx-auto bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-24 h-24 md:w-32 md:h-32 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 md:w-24 md:h-24 bg-purple-200 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 md:w-16 md:h-16 bg-purple-300 rounded-full animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Sobre Mim</h2>
            <p className="text-gray-300 max-w-2xl mx-auto px-4">
              Conheça um pouco mais sobre minha jornada e experiência no desenvolvimento
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                Sou um desenvolvedor Full Stack com 9 meses de experiência criando aplicações web modernas e escaláveis.
                Minha paixão é transformar ideias complexas em soluções digitais elegantes e funcionais.
              </p>

              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                Especializo-me em tecnologias como React, Next.js, Node.js e bancos de dados relacionais. Sempre busco
                estar atualizado com as últimas tendências e melhores práticas do desenvolvimento web.
              </p>

              <div className="grid grid-cols-2 gap-4 md:gap-6 mt-8">
                <div className="text-center p-4 md:p-6 bg-purple-900/30 rounded-lg border border-purple-800">
                  <div className="text-2xl md:text-3xl font-bold text-purple-400">10+</div>
                  <div className="text-sm md:text-base text-gray-300">Projetos Concluídos</div>
                </div>
                <div className="text-center p-4 md:p-6 bg-purple-900/30 rounded-lg border border-purple-800">
                  <div className="text-2xl md:text-3xl font-bold text-purple-400">9</div>
                  <div className="text-sm md:text-base text-gray-300">Meses de Experiência</div>
                </div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <Card className="p-6 md:p-8 border-purple-800 bg-gray-800">
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Code className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />
                    <span className="font-semibold text-white text-sm md:text-base">Desenvolvimento Full Stack</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Palette className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />
                    <span className="font-semibold text-white text-sm md:text-base">UI/UX Design</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Database className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />
                    <span className="font-semibold text-white text-sm md:text-base">Banco de Dados</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />
                    <span className="font-semibold text-white text-sm md:text-base">Aplicações Web</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 md:py-20 bg-gradient-to-br from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Habilidades</h2>
            <p className="text-gray-300 max-w-2xl mx-auto px-4">
              Tecnologias e ferramentas que domino para criar soluções completas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {skills.map((skill, index) => (
              <Card key={index} className="p-4 md:p-6 hover:shadow-lg transition-shadow border-purple-800 bg-gray-800">
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-900/50 rounded-lg">
                      <skill.icon className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />
                    </div>
                    <span className="font-semibold text-white text-sm md:text-base">{skill.name}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Proficiência</span>
                      <span className="text-purple-400 font-medium">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Projetos</h2>
            <p className="text-gray-300 max-w-2xl mx-auto px-4">
              Alguns dos meus trabalhos mais recentes e significativos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-purple-800 bg-gray-800"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-purple-800/50 flex items-center justify-center">
                  <Briefcase className="h-12 w-12 md:h-16 md:w-16 text-purple-400" />
                </div>
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-lg md:text-xl text-white">{project.title}</CardTitle>
                  <CardDescription className="text-gray-300 text-sm md:text-base">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-4 md:p-6 pt-0">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="bg-purple-900/50 text-purple-300 border-purple-700 text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-purple-600 text-purple-400 hover:bg-purple-900/30 bg-transparent text-xs md:text-sm"
                    >
                      <Github className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                      Código
                    </Button>
                    <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700 text-xs md:text-sm">
                      <ExternalLink className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                      Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-12 md:py-20 bg-gradient-to-br from-black via-purple-900/50 to-gray-900 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Vamos Trabalhar Juntos</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Informações de Contato</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-700 rounded-lg flex-shrink-0">
                      <Mail className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium">Email</div>
                      <div className="text-purple-200 text-sm md:text-base break-all">
                        gabrielsantanadasilvagoncalves@gmail.com
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-700 rounded-lg flex-shrink-0">
                      <Github className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium">GitHub</div>
                      <div className="text-purple-200 text-sm md:text-base">github.com/gabrielsantana</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-700 rounded-lg flex-shrink-0">
                      <Linkedin className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium">LinkedIn</div>
                      <div className="text-purple-200 text-sm md:text-base">linkedin.com/in/gabrielsantana</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400 flex flex-col sm:flex-row items-center justify-center gap-2 text-sm md:text-base">
              <span>© 2025. Portfólio. Desenvolvido por Gabriel Santana com</span>
              <span className="flex items-center gap-1">
                <Heart className="h-4 w-4 text-red-500" fill="currentColor" />
                usando Next.js e Tailwind CSS
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
