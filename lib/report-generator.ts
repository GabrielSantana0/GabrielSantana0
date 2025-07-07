import { getMessageStats, getMessages, exportToCSV, type StoredMessage } from "./message-storage"
import nodemailer from "nodemailer"

export interface ReportData {
  period: string
  stats: {
    total: number
    today: number
    thisWeek: number
    thisMonth: number
    byStatus: Record<string, number>
    topDomains: Array<{ domain: string; count: number }>
  }
  recentMessages: StoredMessage[]
  trends: {
    dailyCount: Array<{ date: string; count: number }>
    statusDistribution: Array<{ status: string; count: number; percentage: number }>
  }
}

// Gerar dados do relatório
export async function generateReportData(): Promise<ReportData> {
  const stats = await getMessageStats()
  const messages = await getMessages()

  // Calcular tendências diárias (últimos 7 dias)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return date.toISOString().split("T")[0]
  }).reverse()

  const dailyCount = last7Days.map((date) => {
    const count = messages.filter((msg) => msg.timestamp.startsWith(date)).length
    return {
      date: new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      count,
    }
  })

  // Distribuição de status
  const totalMessages = stats.total
  const statusDistribution = Object.entries(stats.byStatus).map(([status, count]) => ({
    status: status === "new" ? "Novas" : status === "read" ? "Lidas" : "Respondidas",
    count,
    percentage: totalMessages > 0 ? Math.round((count / totalMessages) * 100) : 0,
  }))

  return {
    period: `Relatório de ${new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })}`,
    stats,
    recentMessages: stats.recentMessages,
    trends: {
      dailyCount,
      statusDistribution,
    },
  }
}

// Gerar HTML do relatório
export function generateReportHTML(data: ReportData): string {
  const { stats, recentMessages, trends } = data

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${data.period}</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background: #f8fafc;
        }
        .header {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          color: white;
          padding: 30px;
          border-radius: 12px;
          text-align: center;
          margin-bottom: 30px;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
        }
        .header p {
          margin: 10px 0 0 0;
          opacity: 0.9;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .stat-card {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          text-align: center;
          border-left: 4px solid #7c3aed;
        }
        .stat-number {
          font-size: 32px;
          font-weight: bold;
          color: #7c3aed;
          margin-bottom: 5px;
        }
        .stat-label {
          color: #6b7280;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .section {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          margin-bottom: 25px;
        }
        .section h2 {
          color: #374151;
          margin-top: 0;
          margin-bottom: 20px;
          font-size: 20px;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 10px;
        }
        .chart-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 30px;
        }
        .chart {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .daily-chart {
          display: flex;
          align-items: end;
          height: 150px;
          gap: 8px;
          margin-top: 20px;
        }
        .daily-bar {
          background: linear-gradient(to top, #7c3aed, #a855f7);
          border-radius: 4px 4px 0 0;
          min-height: 20px;
          flex: 1;
          display: flex;
          align-items: end;
          justify-content: center;
          color: white;
          font-size: 12px;
          font-weight: bold;
          padding: 5px 2px;
        }
        .status-list {
          list-style: none;
          padding: 0;
        }
        .status-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .status-item:last-child {
          border-bottom: none;
        }
        .status-bar {
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
          flex: 1;
          margin: 0 15px;
        }
        .status-fill {
          height: 100%;
          background: linear-gradient(90deg, #7c3aed, #a855f7);
          border-radius: 4px;
        }
        .messages-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
        }
        .messages-table th,
        .messages-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        .messages-table th {
          background: #f9fafb;
          font-weight: 600;
          color: #374151;
        }
        .status-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }
        .status-new { background: #fef3c7; color: #92400e; }
        .status-read { background: #dbeafe; color: #1e40af; }
        .status-replied { background: #d1fae5; color: #065f46; }
        .domains-list {
          list-style: none;
          padding: 0;
        }
        .domain-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .domain-item:last-child {
          border-bottom: none;
        }
        .footer {
          text-align: center;
          color: #6b7280;
          font-size: 14px;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
        }
        @media (max-width: 600px) {
          .chart-container {
            grid-template-columns: 1fr;
          }
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>📊 ${data.period}</h1>
        <p>Portfolio Gabriel Santana - Relatório de Mensagens</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">${stats.total}</div>
          <div class="stat-label">Total de Mensagens</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${stats.today}</div>
          <div class="stat-label">Hoje</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${stats.thisWeek}</div>
          <div class="stat-label">Esta Semana</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${stats.thisMonth}</div>
          <div class="stat-label">Este Mês</div>
        </div>
      </div>

      <div class="chart-container">
        <div class="chart">
          <h3>📈 Mensagens por Dia (Últimos 7 dias)</h3>
          <div class="daily-chart">
            ${trends.dailyCount
              .map((day) => {
                const maxCount = Math.max(...trends.dailyCount.map((d) => d.count))
                const height = maxCount > 0 ? (day.count / maxCount) * 100 : 20
                return `
                  <div class="daily-bar" style="height: ${height}%" title="${day.date}: ${day.count} mensagens">
                    ${day.count > 0 ? day.count : ""}
                  </div>
                `
              })
              .join("")}
          </div>
          <div style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 12px; color: #6b7280;">
            ${trends.dailyCount.map((day) => `<span>${day.date}</span>`).join("")}
          </div>
        </div>

        <div class="chart">
          <h3>📋 Status das Mensagens</h3>
          <ul class="status-list">
            ${trends.statusDistribution
              .map(
                (item) => `
              <li class="status-item">
                <span>${item.status}</span>
                <div class="status-bar">
                  <div class="status-fill" style="width: ${item.percentage}%"></div>
                </div>
                <span><strong>${item.count}</strong> (${item.percentage}%)</span>
              </li>
            `,
              )
              .join("")}
          </ul>
        </div>
      </div>

      ${
        stats.topDomains.length > 0
          ? `
      <div class="section">
        <h2>🌐 Top Domínios de Email</h2>
        <ul class="domains-list">
          ${stats.topDomains
            .map(
              (domain) => `
            <li class="domain-item">
              <span><strong>@${domain.domain}</strong></span>
              <span>${domain.count} mensagem${domain.count > 1 ? "s" : ""}</span>
            </li>
          `,
            )
            .join("")}
        </ul>
      </div>
      `
          : ""
      }

      ${
        recentMessages.length > 0
          ? `
      <div class="section">
        <h2>💬 Mensagens Recentes</h2>
        <table class="messages-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Assunto</th>
              <th>Data</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${recentMessages
              .slice(0, 10)
              .map(
                (msg) => `
              <tr>
                <td><strong>${msg.name}</strong></td>
                <td>${msg.email}</td>
                <td>${msg.subject.length > 40 ? msg.subject.substring(0, 40) + "..." : msg.subject}</td>
                <td>${new Date(msg.timestamp).toLocaleDateString("pt-BR")}</td>
                <td>
                  <span class="status-badge status-${msg.status}">
                    ${msg.status === "new" ? "Nova" : msg.status === "read" ? "Lida" : "Respondida"}
                  </span>
                </td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
      `
          : ""
      }

      <div class="footer">
        <p>📧 Relatório gerado automaticamente em ${new Date().toLocaleString("pt-BR")}</p>
        <p>🌐 <strong>gabrielsantana.dev</strong> - Portfolio Profissional</p>
      </div>
    </body>
    </html>
  `
}

// Enviar relatório por email
export async function sendReport(reportHTML: string, period: string): Promise<boolean> {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Credenciais de email não configuradas para envio de relatório")
      return false
    }

    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Gerar CSV para anexar
    const csvData = await exportToCSV()

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "gabrielsantanadasilvagoncalves@gmail.com",
      subject: `📊 ${period} - Portfolio Gabriel Santana`,
      html: reportHTML,
      attachments: [
        {
          filename: `mensagens-${new Date().toISOString().split("T")[0]}.csv`,
          content: csvData,
          contentType: "text/csv",
        },
      ],
    })

    return true
  } catch (error) {
    console.error("Erro ao enviar relatório:", error)
    return false
  }
}

// Gerar e enviar relatório completo
export async function generateAndSendReport(): Promise<boolean> {
  try {
    const reportData = await generateReportData()
    const reportHTML = generateReportHTML(reportData)
    return await sendReport(reportHTML, reportData.period)
  } catch (error) {
    console.error("Erro ao gerar e enviar relatório:", error)
    return false
  }
}
