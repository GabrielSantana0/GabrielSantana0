"use client"

import type React from "react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useContactForm } from "@/hooks/use-contact-form"
import { AlertCircle, CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function ContactForm() {
  const { toast } = useToast()
  const { data, isSubmitting, isSuccess, error, updateFormData, submitForm, resetForm } = useContactForm()
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  // Mostrar toast quando houver sucesso ou erro
  useEffect(() => {
    if (isSuccess) {
      setShowSuccessDialog(true)
      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato. Responderei em breve!",
        variant: "default",
      })
    }
  }, [isSuccess, toast])

  useEffect(() => {
    if (error) {
      toast({
        title: "Erro ao enviar",
        description: error,
        variant: "destructive",
      })
    }
  }, [error, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitForm()
  }

  const handleInputChange =
    (field: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      updateFormData(field, e.target.value)
    }

  return (
    <Card className="bg-black/60 border-2 border-purple-700/40 shadow-2xl shadow-purple-900/20 hover:border-purple-600/60 transition-all duration-300 w-full">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
          <MessageCircle className="h-5 w-5 text-purple-400" />
          Envie uma Mensagem
        </CardTitle>
        <CardDescription className="text-purple-200 text-sm md:text-base">
          Preencha o formulário abaixo e entrarei em contato em breve
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Input
                value={data.name}
                onChange={handleInputChange("name")}
                placeholder="Nome completo"
                disabled={isSubmitting || isSuccess}
                className="bg-gray-700/50 border border-purple-600/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/10 transition-all duration-200 disabled:opacity-50 h-11 md:h-12 text-sm md:text-base"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="email"
                value={data.email}
                onChange={handleInputChange("email")}
                placeholder="seu@email.com"
                disabled={isSubmitting || isSuccess}
                className="bg-gray-700/50 border border-purple-600/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/10 transition-all duration-200 disabled:opacity-50 h-11 md:h-12 text-sm md:text-base"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Input
              value={data.subject}
              onChange={handleInputChange("subject")}
              placeholder="Assunto da mensagem"
              disabled={isSubmitting || isSuccess}
              className="bg-gray-700/50 border border-purple-600/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/10 transition-all duration-200 disabled:opacity-50 h-11 md:h-12 text-sm md:text-base"
            />
          </div>

          <div className="space-y-2">
            <Textarea
              value={data.message}
              onChange={handleInputChange("message")}
              placeholder="Descreva seu projeto, dúvida ou proposta..."
              rows={4}
              disabled={isSubmitting || isSuccess}
              className="bg-gray-700/50 border border-purple-600/30 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/10 transition-all duration-200 resize-none disabled:opacity-50 min-h-[100px] md:min-h-[120px] text-sm md:text-base"
            />
          </div>

          {/* Status Messages */}
          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-900/30 border border-red-600/50 rounded-lg text-red-300">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {isSuccess && (
            <div className="flex items-start gap-2 p-3 bg-green-900/30 border border-green-600/50 rounded-lg text-green-300">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span className="text-sm">Mensagem enviada com sucesso! Obrigado pelo contato.</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 focus:ring-4 focus:ring-purple-400/30 transition-all duration-200 shadow-lg hover:shadow-purple-600/25 disabled:opacity-50 disabled:cursor-not-allowed h-11 md:h-12 text-sm md:text-base"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Enviado!
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Mensagem
                </>
              )}
            </Button>

            {(error || isSuccess) && (
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                className="border-purple-600/50 text-purple-400 hover:bg-purple-900/30 bg-transparent h-11 md:h-12 text-sm md:text-base sm:w-auto w-full"
              >
                Nova Mensagem
              </Button>
            )}
          </div>
        </form>

        {/* Form Progress Indicator */}
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Progresso do formulário</span>
            <span>{Object.values(data).filter(Boolean).length}/4 campos preenchidos</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div
              className="bg-gradient-to-r from-purple-500 to-purple-600 h-1 rounded-full transition-all duration-300"
              style={{
                width: `${(Object.values(data).filter(Boolean).length / 4) * 100}%`,
              }}
            />
          </div>
        </div>
      </CardContent>

      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="bg-gray-800 border-purple-600 mx-4 max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white flex items-center gap-2 text-lg">
              <CheckCircle2 className="h-6 w-6 text-green-400" />
              Formulário Enviado!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300 text-sm">
              Obrigado pelo seu contato, <strong>{data.name}</strong>! Sua mensagem foi enviada com sucesso e recebi uma
              notificação. Entrarei em contato em breve através do email{" "}
              <strong className="break-all">{data.email}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setShowSuccessDialog(false)
                resetForm()
              }}
              className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
            >
              Perfeito!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
