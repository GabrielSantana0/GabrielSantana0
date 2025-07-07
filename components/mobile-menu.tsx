"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Menu, X, Home, User, Code, Briefcase, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileMenuProps {
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void
}

export function MobileMenu({ onNavigate }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Fechar menu ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Prevenir scroll quando menu estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    onNavigate(e, targetId)
    setIsOpen(false)
  }

  const menuItems = [
    { id: "home", label: "Início", icon: Home },
    { id: "about", label: "Sobre", icon: User },
    { id: "skills", label: "Habilidades", icon: Code },
    { id: "projects", label: "Projetos", icon: Briefcase },
    { id: "contact", label: "Contato", icon: Mail },
  ]

  return (
    <>
      {/* Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden relative z-50 p-2 hover:bg-purple-900/30 transition-colors"
        aria-label="Toggle menu"
      >
        <div className="relative w-6 h-6">
          <Menu
            className={`absolute inset-0 w-6 h-6 text-white transition-all duration-300 ${
              isOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
            }`}
          />
          <X
            className={`absolute inset-0 w-6 h-6 text-white transition-all duration-300 ${
              isOpen ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"
            }`}
          />
        </div>
      </Button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-l border-purple-800/50 shadow-2xl z-50 transition-all duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-purple-800/30">
          <div>
            <h3 className="text-white font-bold text-lg">Gabriel Santana</h3>
            <p className="text-purple-300 text-sm">Desenvolvedor Full Stack</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-purple-900/30 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col p-6 space-y-2">
          {menuItems.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`group flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 hover:bg-purple-900/30 hover:translate-x-2 cursor-pointer ${
                index === 0 ? "bg-purple-900/20 border border-purple-700/30" : ""
              }`}
              style={{
                animationDelay: `${index * 50}ms`,
                animation: isOpen ? "slideInRight 0.3s ease-out forwards" : "none",
              }}
            >
              <div className="p-2 bg-purple-900/40 rounded-lg group-hover:bg-purple-700/50 transition-colors">
                <item.icon className="w-5 h-5 text-purple-300 group-hover:text-purple-200" />
              </div>
              <span className="text-white font-medium group-hover:text-purple-200 transition-colors">{item.label}</span>
              <div className="ml-auto w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-purple-800/30">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-gray-400 text-sm">Online agora</span>
          </div>
          <p className="text-center text-gray-500 text-xs mt-2">© 2025 Gabriel Santana</p>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  )
}
