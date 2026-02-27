"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Info, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const details = [
  {
    icon: Calendar,
    title: "Data",
    description: "28 de Março de 2026",
    subtitle: "Sábado",
  },
  {
    icon: Clock,
    title: "Horário",
    description: "A partir das 11h",
    subtitle: "Pontualidade",
  },
  {
    icon: MapPin,
    title: "Localização",
    description: "Condomínio Rio Coxipó",
    subtitle: "Av. das Palmeiras, 2026 - Jardim Imperial - Cuiabá/MT",
  },
  {
    icon: Info,
    title: "Observações",
    description: "Salão de festas",
    subtitle: "Venha com traje confortável",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export function DetailsSection() {
  return (
    <section id="detalhes" className="scroll-mt-20 px-4 py-20 lg:py-32 relative overflow-hidden">
      {/* Background elegant decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center justify-center mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3 h-3 mr-2" /> Informações
          </div>
          <h2 className="text-4xl font-bold text-foreground md:text-5xl mt-2">
            Detalhes do Evento
          </h2>
          <p className="mt-4 text-muted-foreground text-md md:text-lg max-w-2xl mx-auto">
            Tudo o que você precisa saber para aproveitar esse dia tão especial conosco.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 sm:grid-cols-2 lg:gap-8"
        >
          {details.map((detail) => (
            <motion.div key={detail.title} variants={itemVariants} className="h-full">
              <motion.div whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: 0.3 }} className="h-full">
                <Card className="h-full border-0 shadow-xl shadow-primary/5 bg-background/80 backdrop-blur-xl ring-1 ring-border/30 hover:ring-primary/30 transition-all duration-300 relative group p-5 md:p-6 rounded-3xl">
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

                  <div className="flex flex-row items-start gap-4 z-10 relative">
                    <div className="flex size-14 md:size-16 shrink-0 items-center justify-center rounded-[1.3rem] bg-primary/10 shadow-inner group-hover:bg-primary/20 transition-colors duration-300 mt-0.5">
                      <detail.icon className="size-6 md:size-7 text-primary" />
                    </div>
                    <div className="flex flex-col pt-1">
                      <span className="text-[10px] md:text-xs font-extrabold uppercase tracking-widest text-primary/70">
                        {detail.title}
                      </span>
                      <h4 className="text-[15px] md:text-xl font-bold text-foreground leading-tight mt-0.5 tracking-tight">
                        {detail.description}
                      </h4>
                      <p className="text-xs md:text-base text-muted-foreground/80 font-medium leading-normal mt-1 whitespace-pre-wrap">
                        {detail.subtitle}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
