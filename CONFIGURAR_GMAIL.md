# 📧 Configuração do Gmail para o Portfólio

## Passo a Passo Completo

### 1. 🔐 Ativar Autenticação de 2 Fatores

1. Acesse [myaccount.google.com](https://myaccount.google.com)
2. Vá em **Segurança** no menu lateral
3. Em "Como fazer login no Google", clique em **Verificação em duas etapas**
4. Siga as instruções para ativar (use seu celular)

### 2. 🔑 Gerar Senha de App

1. Ainda na seção **Segurança**
2. Clique em **Senhas de app** (aparece após ativar 2FA)
3. Selecione **Outro (nome personalizado)**
4. Digite: "Portfolio Website"
5. Clique em **Gerar**
6. **COPIE A SENHA** gerada (16 caracteres)

### 3. ⚙️ Configurar Variáveis de Ambiente

1. Abra o arquivo `.env.local` na raiz do projeto
2. Adicione suas credenciais:

\`\`\`env
EMAIL_USER=gabrielsantanadasilvagoncalves@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
\`\`\`

**⚠️ IMPORTANTE:** Use a senha de app gerada, NÃO sua senha normal do Gmail!

### 4. 📦 Instalar Dependências

Execute no terminal:

\`\`\`bash
npm install nodemailer @types/nodemailer
\`\`\`

### 5. 🧪 Testar o Sistema

1. Reinicie o servidor: `npm run dev`
2. Acesse seu portfólio
3. Preencha o formulário de contato
4. Envie uma mensagem de teste
5. Verifique sua caixa de entrada do Gmail

## 🔍 Solução de Problemas

### Erro: "Invalid login"
- ✅ Verifique se a autenticação de 2 fatores está ativa
- ✅ Use a senha de app, não a senha normal
- ✅ Confirme se o email está correto

### Erro: "Less secure app access"
- ✅ Use senha de app (mais seguro que "apps menos seguros")
- ✅ Não ative "acesso de apps menos seguros"

### Não recebo emails
- ✅ Verifique a pasta de spam
- ✅ Confirme as variáveis de ambiente
- ✅ Reinicie o servidor após mudanças

## 📱 Exemplo de Email Recebido

Você receberá emails formatados assim:

\`\`\`
De: gabrielsantanadasilvagoncalves@gmail.com
Para: gabrielsantanadasilvagoncalves@gmail.com
Assunto: 🚀 Novo contato do portfólio: [Assunto da mensagem]

[Email HTML formatado com todas as informações]
\`\`\`

## 🚀 Próximos Passos

Após configurar:
1. ✅ Teste com uma mensagem real
2. ✅ Configure notificações no Gmail
3. ✅ Considere criar um email específico para o portfólio
4. ✅ Configure resposta automática (opcional)

## 🆘 Precisa de Ajuda?

Se tiver problemas:
1. Verifique o console do navegador
2. Confira os logs do servidor
3. Teste as credenciais manualmente
\`\`\`

Vou também atualizar as informações de contato no portfólio:

```typescriptreact file="app/page.tsx"
[v0-no-op-code-block-prefix]"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Github, Linkedin, Mail, ExternalLink, Code, Palette, Database, Globe, User, Briefcase, Heart } from 'lucide-react'
import Link from "next/link"
import { useEffect, useState } from "react"
import { ContactForm } from "@/components/contact-form"

export default function Portfolio() {
  const { toast } = useToast()
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {}, [])

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
          <div className="flex justify-center items-center py-4">
            <div className="flex space-x-12">
              <a
                href="#home"
                onClick={(e) => handleSmoothScroll(e, "home")}
                className="relative text-white hover:text-purple-400 transition-colors py-2 px-1 group cursor-pointer"
              >
                Início
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transform scale-x-100 group-hover:scale-x-110 transition-transform"></span>
              </a>
              <a
                href="#about"
                onClick={(e) => handleSmoothScroll(e, "about")}
                className="relative text-gray-300 hover:text-purple-400 transition-colors py-2 px-1 group cursor-pointer"
              >
                Sobre
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </a>
              <a
                href="#skills"
                onClick={(e) => handleSmoothScroll(e, "skills")}
                className="relative text-gray-300 hover:text-purple-400 transition-colors py-2 px-1 group cursor-pointer"
              >
                Habilidades
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </a>
              <a
                href="#projects"
                onClick={(e) => handleSmoothScroll(e, "projects")}
                className="relative text-gray-300 hover:text-purple-400 transition-colors py-2 px-1 group cursor-pointer"
              >
                Projetos
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </a>
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "contact")}
                className="relative text-gray-300 hover:text-purple-400 transition-colors py-2 px-1 group cursor-pointer"
              >
                Contato
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh]">
            <div className="lg:w-1/2 space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold">
                  <span className="text-white">Olá, eu sou</span>
                  <br />
                  <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                    Gabriel Santana
                  </span>
                </h1>
                <p className="text-xl text-gray-300 max-w-lg">
                  Desenvolvedor Full Stack apaixonado por criar experiências digitais incríveis e soluções inovadoras.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700"
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
                  className="border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent"
                  onClick={(e) => {
                    e.preventDefault()
                    handleSmoothScroll(e as any, "projects")
                  }}
                >
                  <Github className="mr-2 h-4 w-4" />
                  Ver Projetos
                </Button>
              </div>

              <div className="flex space-x-6">
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

            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <div className="relative">
                <div className="w-80 h-80 mx-auto bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-32 h-32 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-200 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-300 rounded-full animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Sobre Mim</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Conheça um pouco mais sobre minha jornada e experiência no desenvolvimento
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                Sou um desenvolvedor Full Stack com 9 meses de experiência criando aplicações web modernas e escaláveis.
                Minha paixão é transformar ideias complexas em soluções digitais elegantes e funcionais.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                Especializo-me em tecnologias como React, Next.js, Node.js e bancos de dados relacionais. Sempre busco
                estar atualizado com as últimas tendências e melhores práticas do desenvolvimento web.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-6 bg-purple-900/30 rounded-lg border border-purple-800">
                  <div className="text-3xl font-bold text-purple-400">10+</div>
                  <div className="text-gray-300">Projetos Concluídos</div>
                </div>
                <div className="text-center p-6 bg-purple-900/30 rounded-lg border border-purple-800">
                  <div className="text-3xl font-bold text-purple-400">9</div>
                  <div className="text-gray-300">Meses de Experiência</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="p-8 border-purple-800 bg-gray-800">
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Code className="h-6 w-6 text-purple-400" />
                    <span className="font-semibold text-white">Desenvolvimento Full Stack</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Palette className="h-6 w-6 text-purple-400" />
                    <span className="font-semibold text-white">UI/UX Design</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Database className="h-6 w-6 text-purple-400" />
                    <span className="font-semibold text-white">Banco de Dados</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="h-6 w-6 text-purple-400" />
                    <span className="font-semibold text-white">Aplicações Web</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gradient-to-br from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Habilidades</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Tecnologias e ferramentas que domino para criar soluções completas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-purple-800 bg-gray-800">
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-900/50 rounded-lg">
                      <skill.icon className="h-6 w-6 text-purple-400" />
                    </div>
                    <span className="font-semibold text-white">{skill.name}</span>
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
      <section id="projects" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Projetos</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Alguns dos meus trabalhos mais recentes e significativos</p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-purple-800 bg-gray-800"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-purple-800/50 flex items-center justify-center">
                  <Briefcase className="h-16 w-16 text-purple-400" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-white">{project.title}</CardTitle>
                  <CardDescription className="text-gray-300">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="bg-purple-900/50 text-purple-300 border-purple-700"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-purple-600 text-purple-400 hover:bg-purple-900/30 bg-transparent"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Código
                    </Button>
                    <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                      <ExternalLink className="mr-2 h-4 w-4" />
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
      <section id="contact" className="py-20 bg-gradient-to-br from-black via-purple-900/50 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Vamos Trabalhar Juntos</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Informações de Contato</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-700 rounded-lg">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-purple-200">gabrielsantanadasilvagoncalves@gmail.com</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-700 rounded-lg">
                      <Github className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-medium">GitHub</div>
                      <div className="text-purple-200">github.com/gabrielsantana</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-700 rounded-lg">
                      <Linkedin className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-medium">LinkedIn</div>
                      <div className="text-purple-200">linkedin.com/in/gabrielsantana</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400 flex items-center justify-center gap-2">
              © 2025. Portfólio. Desenvolvido por Gabriel Santana com{" "}
              <Heart className="h-4 w-4 text-red-500" fill="currentColor" /> usando Next.js e Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
