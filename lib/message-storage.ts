import { writeFile, readFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

export interface StoredMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  timestamp: string
  ip?: string
  userAgent?: string
  status: "new" | "read" | "replied"
  source: "portfolio"
}

export interface MessageStats {
  total: number
  today: number
  thisWeek: number
  thisMonth: number
  byStatus: Record<string, number>
  topDomains: Array<{ domain: string; count: number }>
  recentMessages: StoredMessage[]
}

const STORAGE_DIR = path.join(process.cwd(), "data")
const MESSAGES_FILE = path.join(STORAGE_DIR, "messages.json")
const BACKUP_DIR = path.join(STORAGE_DIR, "backups")

// Garantir que os diretórios existem
async function ensureDirectories() {
  if (!existsSync(STORAGE_DIR)) {
    await mkdir(STORAGE_DIR, { recursive: true })
  }
  if (!existsSync(BACKUP_DIR)) {
    await mkdir(BACKUP_DIR, { recursive: true })
  }
}

// Carregar mensagens do arquivo
async function loadMessages(): Promise<StoredMessage[]> {
  try {
    await ensureDirectories()
    if (!existsSync(MESSAGES_FILE)) {
      return []
    }
    const data = await readFile(MESSAGES_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Erro ao carregar mensagens:", error)
    return []
  }
}

// Salvar mensagens no arquivo
async function saveMessages(messages: StoredMessage[]): Promise<void> {
  try {
    await ensureDirectories()
    await writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2))
  } catch (error) {
    console.error("Erro ao salvar mensagens:", error)
    throw error
  }
}

// Adicionar nova mensagem
export async function addMessage(messageData: Omit<StoredMessage, "id" | "timestamp" | "status">): Promise<string> {
  const messages = await loadMessages()

  const newMessage: StoredMessage = {
    ...messageData,
    id: generateId(),
    timestamp: new Date().toISOString(),
    status: "new",
  }

  messages.unshift(newMessage) // Adicionar no início (mais recente primeiro)
  await saveMessages(messages)

  // Fazer backup diário
  await createDailyBackup(messages)

  return newMessage.id
}

// Obter todas as mensagens
export async function getMessages(limit?: number): Promise<StoredMessage[]> {
  const messages = await loadMessages()
  return limit ? messages.slice(0, limit) : messages
}

// Obter mensagem por ID
export async function getMessageById(id: string): Promise<StoredMessage | null> {
  const messages = await loadMessages()
  return messages.find((msg) => msg.id === id) || null
}

// Atualizar status da mensagem
export async function updateMessageStatus(id: string, status: StoredMessage["status"]): Promise<boolean> {
  const messages = await loadMessages()
  const messageIndex = messages.findIndex((msg) => msg.id === id)

  if (messageIndex === -1) return false

  messages[messageIndex].status = status
  await saveMessages(messages)
  return true
}

// Obter estatísticas
export async function getMessageStats(): Promise<MessageStats> {
  const messages = await loadMessages()
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  // Contar por período
  const todayCount = messages.filter((msg) => new Date(msg.timestamp) >= today).length
  const weekCount = messages.filter((msg) => new Date(msg.timestamp) >= thisWeek).length
  const monthCount = messages.filter((msg) => new Date(msg.timestamp) >= thisMonth).length

  // Contar por status
  const byStatus = messages.reduce(
    (acc, msg) => {
      acc[msg.status] = (acc[msg.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Top domínios de email
  const domainCount = messages.reduce(
    (acc, msg) => {
      const domain = msg.email.split("@")[1]?.toLowerCase()
      if (domain) {
        acc[domain] = (acc[domain] || 0) + 1
      }
      return acc
    },
    {} as Record<string, number>,
  )

  const topDomains = Object.entries(domainCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([domain, count]) => ({ domain, count }))

  return {
    total: messages.length,
    today: todayCount,
    thisWeek: weekCount,
    thisMonth: monthCount,
    byStatus,
    topDomains,
    recentMessages: messages.slice(0, 10),
  }
}

// Gerar ID único
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Criar backup diário
async function createDailyBackup(messages: StoredMessage[]): Promise<void> {
  try {
    const today = new Date().toISOString().split("T")[0]
    const backupFile = path.join(BACKUP_DIR, `messages-${today}.json`)

    if (!existsSync(backupFile)) {
      await writeFile(backupFile, JSON.stringify(messages, null, 2))
    }
  } catch (error) {
    console.error("Erro ao criar backup:", error)
  }
}

// Exportar mensagens para CSV
export async function exportToCSV(): Promise<string> {
  const messages = await loadMessages()

  const headers = ["ID", "Nome", "Email", "Assunto", "Mensagem", "Data", "Status", "IP"]
  const rows = messages.map((msg) => [
    msg.id,
    `"${msg.name.replace(/"/g, '""')}"`,
    msg.email,
    `"${msg.subject.replace(/"/g, '""')}"`,
    `"${msg.message.replace(/"/g, '""')}"`,
    new Date(msg.timestamp).toLocaleString("pt-BR"),
    msg.status,
    msg.ip || "",
  ])

  const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

  // Salvar arquivo CSV
  const csvFile = path.join(STORAGE_DIR, `mensagens-${new Date().toISOString().split("T")[0]}.csv`)
  await writeFile(csvFile, csv, "utf-8")

  return csv
}
