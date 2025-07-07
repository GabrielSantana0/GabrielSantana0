import { NextResponse } from "next/server"
import { generateAndSendReport, generateReportData, generateReportHTML } from "@/lib/report-generator"

export async function GET() {
  try {
    const reportData = await generateReportData()
    const reportHTML = generateReportHTML(reportData)

    return new NextResponse(reportHTML, {
      headers: {
        "Content-Type": "text/html",
      },
    })
  } catch (error) {
    console.error("Erro ao gerar relatório:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST() {
  try {
    const success = await generateAndSendReport()

    if (success) {
      return NextResponse.json({ success: true, message: "Relatório enviado com sucesso!" })
    } else {
      return NextResponse.json({ success: false, message: "Erro ao enviar relatório" }, { status: 500 })
    }
  } catch (error) {
    console.error("Erro ao enviar relatório:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
