#!/usr/bin/env node

// 🧪 Script de Teste do Resend - Portfolio Gabriel Santana
// Execute: node scripts/test-resend.js

import { Resend } from "resend"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import { config } from "dotenv"

// Configurar path para .env.local
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const envPath = join(__dirname, "..", ".env.local")

// Carregar variáveis de ambiente
config({ path: envPath })

console.log("🚀 TESTE DE CONFIGURAÇÃO DO RESEND")
console.log("=".repeat(50))
console.log()

async function testResendConfiguration() {
  // 1. Verificar variáveis de ambiente
  console.log("📋 1. Verificando configuração...")

  if (!process.env.RESEND_API_KEY) {
    console.error("❌ RESEND_API_KEY não configurado")
    console.log("💡 Siga os passos:")
    console.log("   1. Acesse: https://resend.com/signup")
    console.log("   2. Crie uma conta gratuita")
    console.log("   3. Vá em 'API Keys' no dashboard")
    console.log("   4. Clique 'Create API Key'")
    console.log("   5. Cole no .env.local: RESEND_API_KEY=re_xxxxxxxxxx")
    return false
  }

  if (process.env.RESEND_API_KEY === "re_SUBSTITUA_PELA_SUA_CHAVE_AQUI") {
    console.error("❌ RESEND_API_KEY ainda não foi configurado")
    console.log("💡 Substitua pela chave real do Resend")
    console.log("📖 Acesse: https://resend.com/api-keys")
    return false
  }

  if (!/^re_[a-zA-Z0-9]{16,}$/.test(process.env.RESEND_API_KEY)) {
    console.error("❌ RESEND_API_KEY tem formato inválido")
    console.log("💡 A chave deve começar com 're_' seguido de caracteres alfanuméricos")
    console.log("📖 Gere uma nova chave em: https://resend.com/api-keys")
    return false
  }

  console.log("✅ RESEND_API_KEY configurado")
  console.log(`🔑 Chave: ${process.env.RESEND_API_KEY.substring(0, 8)}...`)
  console.log()

  // 2. Testar conexão
  console.log("🔄 2. Testando conexão com Resend...")

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)

    // 3. Enviar email de teste
    console.log("📤 3. Enviando email de teste...")

    const { data, error } = await resend.emails.send({
      from: "Portfolio Gabriel <onboarding@resend.dev>",
      to: ["gabrielsantanadasilvagoncalves@gmail.com"],
      subject: "🧪 Teste de Configuração - Portfolio Gabriel Santana",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🎉 Resend Configurado!</h1>
            <p style="color: #e9d5ff; margin: 10px 0 0 0;">Portfolio Gabriel Santana</p>
          </div>
          
          <div style="padding: 30px;">
            <div style="background: #f0fdf4; padding: 20px; border-radius: 12px; border-left: 4px solid #22c55e; margin-bottom: 20px;">
              <h2 style="color: #15803d; margin: 0 0 15px 0; font-size: 18px;">✅ Sistema Funcionando Perfeitamente!</h2>
              <ul style="color: #166534; margin: 0; padding-left: 20px;">
                <li>Resend conectado com sucesso</li>
                <li>API Key válida e funcionando</li>
                <li>Emails sendo enviados corretamente</li>
                <li>Formulário pronto para receber mensagens</li>
              </ul>
            </div>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 12px; border-left: 4px solid #f59e0b;">
              <h3 style="color: #92400e; margin: 0 0 10px 0;">📋 Próximos Passos:</h3>
              <ol style="color: #78350f; margin: 0; padding-left: 20px;">
                <li>Teste o formulário no seu portfolio</li>
                <li>Configure um domínio personalizado (opcional)</li>
                <li>Monitore os emails no dashboard do Resend</li>
              </ol>
            </div>
          </div>
          
          <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              🧪 Email de teste enviado em: ${new Date().toLocaleString("pt-BR", {
                timeZone: "America/Sao_Paulo",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}<br>
              🌐 Sistema: Portfolio Gabriel Santana<br>
              📧 Provedor: Resend
            </p>
          </div>
        </div>
      `,
      text: `
🎉 Resend Configurado com Sucesso!

Portfolio Gabriel Santana

✅ SISTEMA FUNCIONANDO:
- Resend conectado
- API Key válida
- Emails sendo enviados
- Formulário operacional

📋 PRÓXIMOS PASSOS:
1. Teste o formulário no portfolio
2. Configure domínio personalizado (opcional)
3. Monitore emails no dashboard

---
Teste enviado em: ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}
Sistema: Portfolio Gabriel Santana
Provedor: Resend
      `,
    })

    if (error) {
      console.error("❌ Erro do Resend:", error)
      return false
    }

    console.log("✅ Email de teste enviado com sucesso!")
    console.log(`📧 Email ID: ${data?.id}`)
    console.log(`📬 Enviado para: gabrielsantanadasilvagoncalves@gmail.com`)
    console.log()

    console.log("🎉 CONFIGURAÇÃO COMPLETA!")
    console.log("=".repeat(50))
    console.log("✅ Seu portfolio está pronto para receber mensagens!")
    console.log("📧 Verifique sua caixa de entrada do Gmail")
    console.log("🚀 Teste agora o formulário no seu site")
    console.log("📊 Monitore emails em: https://resend.com/emails")

    return true
  } catch (error) {
    console.error("❌ Erro na configuração:")
    console.error(`   ${error.message}`)
    console.log()

    // Diagnóstico de erros comuns
    if (error.message.includes("API key is invalid")) {
      console.log("🔧 SOLUÇÃO PARA 'API key is invalid':")
      console.log("1. ✅ Verifique se a chave está correta")
      console.log("2. ✅ Gere uma nova chave em: https://resend.com/api-keys")
      console.log("3. ✅ Confirme que copiou a chave completa")
      console.log("4. ✅ Reinicie o servidor após alterar o .env.local")
    } else if (error.message.includes("rate limit")) {
      console.log("🔧 SOLUÇÃO PARA rate limit:")
      console.log("1. ✅ Aguarde alguns minutos e tente novamente")
      console.log("2. ✅ O plano gratuito tem limite de emails por hora")
    } else {
      console.log("🔧 SOLUÇÕES GERAIS:")
      console.log("1. ✅ Verifique sua conexão com a internet")
      console.log("2. ✅ Confirme a chave no .env.local")
      console.log("3. ✅ Tente gerar uma nova API key")
    }

    console.log()
    console.log("📖 Documentação: https://resend.com/docs")

    return false
  }
}

// Executar teste
testResendConfiguration().then((success) => {
  process.exit(success ? 0 : 1)
})
