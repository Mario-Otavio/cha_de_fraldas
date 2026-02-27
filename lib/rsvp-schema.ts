import { z } from "zod"

export const rsvpSchema = z
  .object({
    nome: z.string().min(2, "Por favor, informe seu nome completo."),
    presenca: z.enum(["sim", "nao"], {
      required_error: "Por favor, confirme sua presença.",
    }),
    acompanhantes: z.coerce.number().min(0).max(10),
    acompanhantesNomes: z.array(
      z.object({
        nome: z.string().min(2, "Informe o nome do acompanhante."),
      })
    ),
    whatsapp: z.string().min(1, "Por favor, informe seu telefone/WhatsApp.").refine(
      (value) => {
        const numbers = value.replace(/\D/g, "");
        return numbers.length >= 10 && numbers.length <= 11;
      },
      "Informe um telefone válido com DDD (10 ou 11 dígitos)."
    ),
    mensagem: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.presenca === "nao") {
        return data.acompanhantes === 0
      }
      return true
    },
    {
      message: "Se você não irá comparecer, o número de acompanhantes deve ser 0.",
      path: ["acompanhantes"],
    }
  )

export type RSVPFormData = z.infer<typeof rsvpSchema>
