"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  BarChart3,
  Mail,
  MessageCircle,
  Send,
  TrendingUp,
  Calendar,
  RefreshCw,
  Eye,
  CheckCircle,
  Clock,
} from "lucide-react"
import type { MessageStats, StoredMessage } from "@/lib/message-storage"

export default function AdminDashboard() {
  const [stats, setStats] = useState<MessageStats | null>(null)
  const [messages, setMessages] = useState<StoredMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [sendingReport, setSendingReport] = useState(false)
  const { toast } = useToast()

  const loadData = async () => {
    try {
      setLoading(true)

      // Carregar estatísticas
      const statsResponse = await fetch("/api/admin/dashboard")
      const statsData = await statsResponse.json()
      setStats(statsData)

      // Carregar mensagens recentes
      const messagesResponse = await fetch("/api/admin/messages?limit=20")
      const messagesData = await messagesResponse.json()
      setMessages(messagesData)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
      toast({
        title: "Erro",
        description: "Erro ao carregar dados do dashboard",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const sendReport = async () => {
    try {
      setSendingReport(true)
      const response = await fetch("/api/admin/reports", { method: "POST" })
      const result = await response.json()

      if (result.success) {
        toast({
          title: "Sucesso!",
          description: "Relatório enviado por email com sucesso",
        })
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao enviar relatório",
        variant: "destructive",
      })
    } finally {
      setSendingReport(false)
    }
  }

  const updateMessageStatus = async (id: string, status: StoredMessage["status"]) => {
    try {
      const response = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })

      if (response.ok) {
        await loadData() // Recarregar dados
        toast({
          title: "Sucesso!",
          description: "Status da mensagem atualizado",
        })
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar status",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">📊 Dashboard Administrativo</h1>
              <p className="text-gray-600 mt-2">Portfolio Gabriel Santana - Gestão de Mensagens</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={loadData} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
              <Button
                onClick={sendReport}
                disabled={sendingReport}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700"
              >
                {sendingReport ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                Enviar Relatório
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href="/api/admin/reports" target="_blank" rel="noreferrer">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Relatório
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Mensagens</CardTitle>
                <MessageCircle className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">Todas as mensagens recebidas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hoje</CardTitle>
                <Calendar className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.today}</div>
                <p className="text-xs text-muted-foreground">Mensagens de hoje</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Esta Semana</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.thisWeek}</div>
                <p className="text-xs text-muted-foreground">Últimos 7 dias</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Este Mês</CardTitle>
                <BarChart3 className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.thisMonth}</div>
                <p className="text-xs text-muted-foreground">Mês atual</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Status Distribution */}
        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>📋 Status das Mensagens</CardTitle>
                <CardDescription>Distribuição por status de atendimento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(stats.byStatus).map(([status, count]) => {
                    const percentage = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0
                    const statusLabel = status === "new" ? "Novas" : status === "read" ? "Lidas" : "Respondidas"
                    const statusColor =
                      status === "new" ? "bg-yellow-500" : status === "read" ? "bg-blue-500" : "bg-green-500"

                    return (
                      <div key={status} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${statusColor}`} />
                          <span className="font-medium">{statusLabel}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className={`h-2 rounded-full ${statusColor}`} style={{ width: `${percentage}%` }} />
                          </div>
                          <span className="text-sm font-medium w-12 text-right">
                            {count} ({percentage}%)
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🌐 Top Domínios</CardTitle>
                <CardDescription>Principais domínios de email</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.topDomains.length > 0 ? (
                    stats.topDomains.map((domain, index) => (
                      <div key={domain.domain} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-bold text-purple-600">
                            {index + 1}
                          </div>
                          <span className="font-medium">@{domain.domain}</span>
                        </div>
                        <Badge variant="secondary">{domain.count} mensagens</Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">Nenhum domínio encontrado</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <CardTitle>💬 Mensagens Recentes</CardTitle>
            <CardDescription>Últimas mensagens recebidas pelo formulário</CardDescription>
          </CardHeader>
          <CardContent>
            {messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{message.name}</h3>
                          <Badge
                            variant={
                              message.status === "new"
                                ? "destructive"
                                : message.status === "read"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {message.status === "new" ? "Nova" : message.status === "read" ? "Lida" : "Respondida"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          <Mail className="h-3 w-3 inline mr-1" />
                          {message.email}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {new Date(message.timestamp).toLocaleString("pt-BR")}
                        </p>
                        <p className="font-medium text-gray-800 mb-2">{message.subject}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {message.message.length > 150 ? message.message.substring(0, 150) + "..." : message.message}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateMessageStatus(message.id, "read")}
                          disabled={message.status === "read"}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Marcar como Lida
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateMessageStatus(message.id, "replied")}
                          disabled={message.status === "replied"}
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Marcar como Respondida
                        </Button>
                        <Button size="sm" asChild>
                          <a href={`mailto:${message.email}?subject=Re: ${message.subject}`}>
                            <Send className="h-3 w-3 mr-1" />
                            Responder
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Nenhuma mensagem encontrada</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
