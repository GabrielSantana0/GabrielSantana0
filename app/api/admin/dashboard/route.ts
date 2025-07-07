import { NextResponse } from "next/server"
import { getMessageStats } from "@/lib/message-storage"

export async function GET() {
  try {
    const stats = await getMessageStats()
    return NextResponse.json(stats)
  } catch (error) {
    console.error("Erro ao obter estatísticas:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
