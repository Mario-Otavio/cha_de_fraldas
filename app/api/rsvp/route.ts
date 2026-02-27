import { NextResponse } from "next/server"
import axios from "axios"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validação básica no servidor
    if (!body.nome || typeof body.nome !== "string" || !body.nome.trim()) {
      return NextResponse.json(
        { message: "O campo 'nome' é obrigatório." },
        { status: 400 }
      )
    }

    if (typeof body.presenca !== "boolean") {
      return NextResponse.json(
        { message: "O campo 'presença' é obrigatório." },
        { status: 400 }
      )
    }

    // Se não vai comparecer, a quantidade de acompanhantes deve ser 0
    if (!body.presenca && (body.acompanhantes ?? 0) > 0) {
      return NextResponse.json(
        { message: "Se você não irá comparecer, não pode ter acompanhantes." },
        { status: 400 }
      )
    }

    const acompanhantesNomes = Array.isArray(body.acompanhantesNomes)
      ? body.acompanhantesNomes.filter((n: unknown) => typeof n === "string" && n.trim())
      : []

    const payload = {
      nome: body.nome,
      presenca: body.presenca,
      acompanhantes: body.acompanhantes,
      acompanhantesNomes,
      whatsapp: body.whatsapp,
      mensagem: body.mensagem,
    }

    // URL de implantação do seu Web App no Apps Script
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbyc5BNI9Znty4fSjJz20Tk0Rzhq4kJj8kcLuPrWhilI_qxg7qI9heokO8gdzTnxxm1AWw/exec"
    
    if (GOOGLE_SCRIPT_URL) {
      try {
        await axios.post(GOOGLE_SCRIPT_URL, payload, {
          headers: {
            "Content-Type": "application/json"
          }
        })
      } catch (axiosError) {
        console.error("Erro ao enviar dados para a planilha:", axiosError)
      }
    }

    return NextResponse.json({ message: "Confirmação registrada com sucesso!" })
  } catch (error) {
    console.error("Erro ao processar confirmação:", error)
    return NextResponse.json(
      { message: "Erro interno do servidor. Tente novamente mais tarde." },
      { status: 500 }
    )
  }
}
