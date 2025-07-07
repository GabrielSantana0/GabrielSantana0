#!/usr/bin/env node

// 📊 Script para Envio Automático de Relatórios Semanais
// Execute: node scripts/send-weekly-report.js
// Configure no cron: 0 9 * * 1 (toda segunda-feira às 9h)

import { generateAndSendReport } from "../lib/report-generator.js"
import { config } from "dotenv"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

// Configurar path para .env.local
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const envPath = join(__dirname, "..", ".env.local")

// Carregar variáveis de ambiente
config({ path: envPath })

console.log("📊 ENVIO AUTOMÁTICO DE RELATÓRIO SEMANAL")
console.log("=".repeat(50))
console.log()

async function sendWeeklyReport() {
  try {
    console.log("🔄 Gerando relatório semanal...")

    const success = await generateAndSendReport()

    if (success) {
      console.log("✅ Relatório semanal enviado com sucesso!")
      console.log(`📧 Enviado para: gabrielsantanadasilvagoncalves@gmail.com`)
      console.log(`🕒 Data/Hora: ${new Date().toLocaleString("pt-BR")}`)
      console.log()
      console.log("📋 O relatório inclui:")
      console.log("• Estatísticas de mensagens")
      console.log("• Gráficos de tendências")
      console.log("• Lista de mensagens recentes")
      console.log("• Arquivo CSV em anexo")
      console.log("• Análise de domínios")
    } else {
      console.error("❌ Erro ao enviar relatório semanal")
      process.exit(1)
    }
  } catch (error) {
    console.error("❌ Erro no script de relatório:", error.message)
    process.exit(1)
  }
}

// Verificar se é segunda-feira (opcional)
const today = new Date()
const isMonday = today.getDay() === 1

if (process.argv.includes("--force") || isMonday) {
  sendWeeklyReport()
} else {
  console.log("ℹ️  Relatório semanal é enviado apenas às segundas-feiras")
  console.log("💡 Use --force para enviar agora: node scripts/send-weekly-report.js --force")
}
