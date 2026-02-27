"use client"

import { motion } from "framer-motion"
import { Heart, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

function FloatingHeart({ delay, x, size }: { delay: number; x: number; size: number }) {
  return (
    <motion.div
      className="absolute text-primary/20 pointer-events-none"
      style={{ left: `${x}%`, bottom: "10%" }}
      animate={{
        y: [0, -120, -260],
        opacity: [1, 3, 1],
        scale: [0.5, 1, 0.7],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        delay,
        ease: "easeOut",
      }}
    >
      <Heart className={`size-${size}`} fill="currentColor" />
    </motion.div>
  )
}

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-4 py-20">
      {/* Gradiente de fundo suave */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.93_0.03_350)_0%,transparent_70%)]" />

      {/* Corações flutuantes */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingHeart delay={0} x={15} size={4} />
        <FloatingHeart delay={1.5} x={75} size={3} />
        <FloatingHeart delay={3} x={45} size={5} />
        <FloatingHeart delay={4.5} x={85} size={3} />
        <FloatingHeart delay={2} x={25} size={4} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-2xl text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="mx-auto mb-6 flex justify-center"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex size-16 items-center justify-center rounded-full bg-primary/10 shadow-inner ring-1 ring-primary/20 backdrop-blur-md"
          >
            <Heart className="size-8 text-primary drop-shadow-md" fill="currentColor" />
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-3 text-sm font-medium uppercase tracking-widest text-primary"
        >
          Você está convidado(a)
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-balance text-4xl font-bold text-foreground md:text-6xl"
        >
          Chá de Fraldas
          <span className="block text-primary">da Luna</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mx-auto mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Venha celebrar a chegada da nossa princesinha!
          <br />
          Será um dia cheio de amor, carinho e muita alegria.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="mt-3 text-sm font-semibold text-foreground"
        >
          {"28 de Março de 2026 - 11h"}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button asChild size="lg" className="cursor-pointer w-[214px] rounded-full px-8 text-base shadow-md">
              <a href="#confirmar">Confirmar presença</a>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button asChild variant="outline" size="lg" className="cursor-pointer w-[214px] rounded-full px-8 text-base">
              <a href="#detalhes">Ver detalhes</a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-12"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="mx-auto size-5 text-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
