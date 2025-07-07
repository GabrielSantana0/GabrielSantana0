#!/usr/bin/env node

// 🧪 Script de Teste de Email - Portfolio Gabriel Santana
// Execute: npm run test:email

import nodemailer from "nodemailer"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import { config } from "dotenv"

// Configurar path para .env.local
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const envPath = join(__dirname, "..", ".env.local")

// Carregar variáveis de ambiente
config({ path: envPath })

console.log("🚀 TESTE DE CONFIGURAÇÃO DE EMAIL")
console.log("=".repeat(50))
console.log()

async function testEmailConfiguration() {
  // 1. Verificar variáveis de ambiente
  console.log("📋 1. Verificando configuração...")

  if (!process.env.EMAIL_USER) {
    console.error("❌ EMAIL_USER não configurado")
    console.log("💡 Adicione no .env.local: EMAIL_USER=gabrielsantanadasilvagoncalves@gmail.com")
    return false
  }

  if (!process.env.EMAIL_PASS) {
    console.error("❌ EMAIL_PASS não configurado")
    console.log("💡 Adicione no .env.local: EMAIL_PASS=sua_senha_de_app")
    console.log("📖 Veja o guia: CONFIGURACAO_GMAIL_PASSO_A_PASSO.md")
    return false
  }

  if (process.env.EMAIL_PASS === "SUBSTITUA_PELA_SENHA_DE_APP_AQUI") {
    console.error("❌ EMAIL_PASS ainda não foi configurado")
    console.log("💡 Substitua pela senha de app real do Gmail")
    console.log("📖 Veja o guia: CONFIGURACAO_GMAIL_PASSO_A_PASSO.md")
    return false
  }

  console.log("✅ Variáveis de ambiente configuradas")
  console.log(`📧 Email: ${process.env.EMAIL_USER}`)
  console.log(
    `🔑 Senha: ${"*".repeat(Math.min(process.env.EMAIL_PASS.length, 16))} (${process.env.EMAIL_PASS.length} caracteres)`,
  )
  console.log()

  // 2. Testar conexão
  console.log("🔄 2. Testando conexão com Gmail...")

  try {
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.verify()
    console.log("✅ Conexão estabelecida com sucesso!")
    console.log()

    // 3. Enviar email de teste
    console.log("📤 3. Enviando email de teste...")

    const testEmailContent = {
      from: process.env.EMAIL_USER,
      to: "gabrielsantanadasilvagoncalves@gmail.com",
      subject: "🧪 Teste de Configuração - Portfolio Gabriel Santana",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🎉 Configuração Bem-sucedida!</h1>
            <p style="color: #e9d5ff; margin: 10px 0 0 0;">Portfolio Gabriel Santana</p>
          </div>
          
          <div style="padding: 30px;">
            <div style="background: #f0fdf4; padding: 20px; border-radius: 12px; border-left: 4px solid #22c55e; margin-bottom: 20px;">
              <h2 style="color: #15803d; margin: 0 0 15px 0; font-size: 18px;">✅ Sistema Funcionando Perfeitamente!</h2>
              <ul style="color: #166534; margin: 0; padding-left: 20px;">
                <li>Gmail conectado com sucesso</li>
                <li>Nodemailer configurado</li>
                <li>API de envio funcionando</li>
                <li>Formulário pronto para receber mensagens</li>
              </ul>
            </div>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 12px; border-left: 4px solid #f59e0b;">
              <h3 style="color: #92400e; margin: 0 0 10px 0;">📋 Próximos Passos:</h3>
              <ol style="color: #78350f; margin: 0; padding-left: 20px;">
                <li>Teste o formulário no seu portfolio</li>
                <li>Configure notificações no Gmail (opcional)</li>
                <li>Personalize as respostas automáticas</li>
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
              🌐 Sistema: Portfolio Gabriel Santana
            </p>
          </div>
        </div>
      `,
    }

    const info = await transporter.sendMail(testEmailContent)

    console.log("✅ Email de teste enviado com sucesso!")
    console.log(`📧 Message ID: ${info.messageId}`)
    console.log(`📬 Enviado para: gabrielsantanadasilvagoncalves@gmail.com`)
    console.log()

    console.log("🎉 CONFIGURAÇÃO COMPLETA!")
    console.log("=".repeat(50))
    console.log("✅ Seu portfolio está pronto para receber mensagens!")
    console.log("📧 Verifique sua caixa de entrada do Gmail")
    console.log("🚀 Teste agora o formulário no seu site")

    return true
  } catch (error) {
    console.error("❌ Erro na configuração:")
    console.error(`   ${error.message}`)
    console.log()

    // Diagnóstico de erros comuns
    if (error.message.includes("Invalid login")) {
      console.log("🔧 SOLUÇÃO PARA 'Invalid login':")
      console.log("1. ✅ Confirme que a verificação em 2 etapas está ATIVA")
      console.log("2. ✅ Use a SENHA DE APP (16 caracteres), não a senha normal")
      console.log("3. ✅ Verifique se o email está correto")
      console.log("4. ✅ Gere uma nova senha de app se necessário")
    } else if (error.message.includes("EAUTH")) {
      console.log("🔧 SOLUÇÃO PARA erro de autenticação:")
      console.log("1. ✅ Gere uma nova senha de app")
      console.log("2. ✅ Aguarde alguns minutos e tente novamente")
      console.log("3. ✅ Verifique se copiou a senha completa")
    } else {
      console.log("🔧 SOLUÇÕES GERAIS:")
      console.log("1. ✅ Verifique sua conexão com a internet")
      console.log("2. ✅ Confirme as credenciais no .env.local")
      console.log("3. ✅ Tente gerar uma nova senha de app")
    }

    console.log()
    console.log("📖 Guia completo: CONFIGURACAO_GMAIL_PASSO_A_PASSO.md")

    return false
  }
}

// Executar teste
testEmailConfiguration().then((success) => {
  process.exit(success ? 0 : 1)
})
