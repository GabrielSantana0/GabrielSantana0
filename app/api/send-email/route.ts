import { type NextRequest, NextResponse } from "next/server"
import type { ContactFormData, ApiResponse } from "@/types/contact"
import { Resend } from "resend"
import { addMessage } from "@/lib/message-storage"

// Rate limiting simples
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutos
  const maxRequests = 5

  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

function validateContactData(data: any): data is ContactFormData {
  return (
    typeof data.name === "string" &&
    typeof data.email === "string" &&
    typeof data.subject === "string" &&
    typeof data.message === "string" &&
    data.name.trim().length >= 2 &&
    data.subject.trim().length >= 5 &&
    data.message.trim().length >= 10 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  )
}

export async function POST(request: NextRequest) {
  try {
    console.log("📧 Iniciando processamento do formulário...")

    // Rate limiting
    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"
    if (!checkRateLimit(ip)) {
      console.log("❌ Rate limit excedido para IP:", ip)
      return NextResponse.json(
        { success: false, message: "Muitas tentativas. Tente novamente em 15 minutos." },
        { status: 429 },
      )
    }

    const body = await request.json()
    console.log("📋 Dados recebidos:", { name: body.name, email: body.email, subject: body.subject })

    // Validação
    if (!validateContactData(body)) {
      console.log("❌ Dados inválidos")
      return NextResponse.json(
        { success: false, message: "Dados do formulário inválidos. Verifique todos os campos." },
        { status: 400 },
      )
    }

    const { name, email, subject, message }: ContactFormData = body

    // Sanitização
    const sanitizedData = {
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 100),
      subject: subject.trim().slice(0, 200),
      message: message.trim().slice(0, 2000),
    }

    console.log("✅ Dados validados e sanitizados")

    // Salvar mensagem
    const messageId = await addMessage({
      name: sanitizedData.name,
      email: sanitizedData.email,
      subject: sanitizedData.subject,
      message: sanitizedData.message,
      ip,
      userAgent: request.headers.get("user-agent") || undefined,
      source: "portfolio",
    })

    console.log("💾 Mensagem salva com ID:", messageId)

    // Verificar configuração do Resend
    const resendKey = process.env.RESEND_API_KEY
    if (!resendKey || !resendKey.startsWith("re_")) {
      console.error("❌ RESEND_API_KEY não configurado corretamente")
      return NextResponse.json(
        { success: false, message: "Serviço de email não configurado. Entre em contato diretamente." },
        { status: 500 },
      )
    }

    // Enviar email via Resend
    console.log("📤 Enviando email via Resend...")
    const resend = new Resend(resendKey)

    const { data, error } = await resend.emails.send({
      from: "Portfolio Gabriel <onboarding@resend.dev>",
      to: ["gabrielsantanadasilvagoncalves@gmail.com"],
      subject: `🚀 Novo contato do portfólio: ${sanitizedData.subject}`,
      html: generateEmailHTML(messageId, sanitizedData),
      text: generateEmailText(messageId, sanitizedData),
    })

    if (error) {
      console.error("❌ Erro do Resend:", error)
      throw new Error("Falha no envio do email")
    }

    console.log("✅ Email enviado com sucesso! ID:", data?.id)

    const response: ApiResponse = {
      success: true,
      message: `Obrigado ${sanitizedData.name}! Sua mensagem foi enviada com sucesso. Entrarei em contato em breve através do email ${sanitizedData.email}.`,
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error("❌ Erro na API de envio de email:", error)

    const response: ApiResponse = {
      success: false,
      message: "Erro ao enviar mensagem. Tente novamente em alguns minutos ou entre em contato diretamente.",
    }

    return NextResponse.json(response, { status: 500 })
  }
}

function generateEmailHTML(id: string, data: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0;">💼 Nova Mensagem do Portfólio</h1>
        <p style="color: #e9d5ff; margin: 10px 0 0 0;">Gabriel Santana - Desenvolvedor Full Stack</p>
      </div>
      
      <div style="padding: 30px; background: white;">
        <h2 style="color: #374151; margin: 0 0 20px 0;">📋 Informações do Contato</h2>
        <p><strong>ID:</strong> ${id}</p>
        <p><strong>Nome:</strong> ${data.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><strong>Assunto:</strong> ${data.subject}</p>
        <p><strong>Data:</strong> ${new Date().toLocaleString("pt-BR")}</p>
        
        <h3 style="color: #374151; margin: 20px 0 10px 0;">💬 Mensagem:</h3>
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 3px solid #7c3aed;">
          ${data.message.replace(/\n/g, "<br>")}
        </div>
        
        <div style="margin-top: 25px; text-align: center;">
          <a href="mailto:${data.email}?subject=Re: ${data.subject}" 
             style="background: #7c3aed; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block;">
            📧 Responder
          </a>
        </div>
      </div>
    </div>
  `
}

function generateEmailText(id: string, data: any) {
  return `
Nova mensagem do portfólio - Gabriel Santana

ID: ${id}
Nome: ${data.name}
Email: ${data.email}
Assunto: ${data.subject}
Data: ${new Date().toLocaleString("pt-BR")}

MENSAGEM:
${data.message}

---
Para responder, envie email para: ${data.email}
  `
}

export async function GET() {
  return NextResponse.json({ success: false, message: "Método não permitido" }, { status: 405 })
}
