"use client"

import { useState, useCallback } from "react"
import type { ContactFormData, ContactFormState, FormErrors, ApiResponse } from "@/types/contact"

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
}

const initialState: ContactFormState = {
  isSubmitting: false,
  isSuccess: false,
  error: null,
  data: initialFormData,
}

export function useContactForm() {
  const [state, setState] = useState<ContactFormState>(initialState)

  // Validação do formulário
  const validateForm = useCallback((data: ContactFormData): FormErrors => {
    const errors: FormErrors = {}

    if (!data.name.trim()) {
      errors.name = "Nome é obrigatório"
    } else if (data.name.trim().length < 2) {
      errors.name = "Nome deve ter pelo menos 2 caracteres"
    }

    if (!data.email.trim()) {
      errors.email = "Email é obrigatório"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Email inválido"
    }

    if (!data.subject.trim()) {
      errors.subject = "Assunto é obrigatório"
    } else if (data.subject.trim().length < 5) {
      errors.subject = "Assunto deve ter pelo menos 5 caracteres"
    }

    if (!data.message.trim()) {
      errors.message = "Mensagem é obrigatória"
    } else if (data.message.trim().length < 10) {
      errors.message = "Mensagem deve ter pelo menos 10 caracteres"
    }

    return errors
  }, [])

  // Atualizar dados do formulário
  const updateFormData = useCallback((field: keyof ContactFormData, value: string) => {
    setState((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [field]: value,
      },
      error: null, // Limpar erro ao digitar
    }))
  }, [])

  // Enviar formulário
  const submitForm = useCallback(async (): Promise<boolean> => {
    console.log("🚀 Iniciando envio do formulário...")

    // Validar formulário
    const errors = validateForm(state.data)
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0]
      setState((prev) => ({
        ...prev,
        error: firstError,
      }))
      console.log("❌ Erro de validação:", firstError)
      return false
    }

    setState((prev) => ({
      ...prev,
      isSubmitting: true,
      error: null,
    }))

    try {
      console.log("📤 Enviando dados para API...")

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 segundos timeout

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state.data),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      console.log("📡 Resposta recebida:", response.status)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`)
      }

      const result: ApiResponse = await response.json()
      console.log("✅ Resultado:", result)

      if (!result.success) {
        throw new Error(result.message || "Erro desconhecido")
      }

      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        isSuccess: true,
        error: null,
      }))

      console.log("🎉 Formulário enviado com sucesso!")

      // Resetar formulário após 5 segundos
      setTimeout(() => {
        setState(initialState)
      }, 5000)

      return true
    } catch (error) {
      console.error("❌ Erro no envio:", error)

      let errorMessage = "Erro desconhecido"

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          errorMessage = "Tempo limite excedido. Tente novamente."
        } else {
          errorMessage = error.message
        }
      }

      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        error: errorMessage,
      }))

      return false
    }
  }, [state.data, validateForm])

  // Resetar formulário
  const resetForm = useCallback(() => {
    setState(initialState)
  }, [])

  return {
    ...state,
    updateFormData,
    submitForm,
    resetForm,
    validateForm,
  }
}
