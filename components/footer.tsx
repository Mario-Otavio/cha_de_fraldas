"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="relative mt-12 overflow-hidden border-t border-primary/10 bg-background/50 backdrop-blur-xl pb-12 pt-16">
      {/* Background elegant decoration */}
      <div className="absolute top-0 left-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl -z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-5xl px-4 text-center z-10 relative"
      >
        <div className="flex flex-col items-center gap-8">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex size-16 items-center justify-center rounded-full bg-primary/10 shadow-inner ring-1 ring-primary/20 backdrop-blur-md"
          >
            <Heart className="size-8 text-primary drop-shadow-md" fill="currentColor" />
          </motion.div>

          <h3 className="max-w-lg text-xl md:text-3xl text-foreground font-medium leading-normal">
            Feito com <span className="text-primary italic">muito amor</span> para receber você nesse dia tão especial!
          </h3>

          <Separator className="w-full max-w-xs bg-primary/20" />

          <div className="rounded-2xl bg-secondary/5 px-5 py-5 md:px-8 border border-secondary/10 mt-2 backdrop-blur-sm shadow-sm inline-block">
            <p className="text-xs md:text-sm leading-relaxed text-muted-foreground font-medium">
              <span className="block mb-1.5">Seus dados serão usados apenas para a organização do evento. Nenhuma informação será compartilhada com terceiros.</span>
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}

