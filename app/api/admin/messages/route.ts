import { type NextRequest, NextResponse } from "next/server"
import { getMessages, updateMessageStatus } from "@/lib/message-storage"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit")
    const limitNumber = limit ? Number.parseInt(limit, 10) : undefined

    const messages = await getMessages(limitNumber)
    return NextResponse.json(messages)
  } catch (error) {
    console.error("Erro ao obter mensagens:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json()

    if (!id || !status) {
      return NextResponse.json({ error: "ID e status são obrigatórios" }, { status: 400 })
    }

    const updated = await updateMessageStatus(id, status)

    if (!updated) {
      return NextResponse.json({ error: "Mensagem não encontrada" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao atualizar mensagem:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
