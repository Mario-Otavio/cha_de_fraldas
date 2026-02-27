import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RSVPSuccessMessageProps {
    onReset: () => void
}

export function RSVPSuccessMessage({ onReset }: RSVPSuccessMessageProps) {
    return (
        <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center text-center pb-3 space-y-4"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-green-100/90 text-green-400 shadow-inner ring-1 ring-green-400/20 flex items-center justify-center mb-2"
            >
                <CheckCircle2 className="size-10" />
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">Confirmação Enviada!</h3>
            <p className="text-muted-foreground text-base md:text-lg max-w-sm font-medium">
                Muito obrigado por responder. Todas as informações foram registradas com sucesso!
            </p>
            <Button
                variant="outline"
                className="mt-3 rounded-full px-6 cursor-pointer"
                onClick={onReset}
            >
                Enviar nova resposta
            </Button>
        </motion.div>
    )
}
