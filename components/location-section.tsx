"use client"

import { motion } from "framer-motion"
import { MapPin, ExternalLink, Navigation, PartyPopper } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const address = "Condomínio Rio Coxipó, Av. das Palmeiras, 2026 - Jardim Imperial, Cuiabá - MT"
const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`

export function LocationSection() {
  return (
    <section id="local" className="scroll-mt-20 px-4 py-16 lg:py-32 relative overflow-hidden">
      {/* Decoração elegante de fundo */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 -translate-y-1/2 -translate-x-1/4" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/4" />

      <div className="mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center justify-center mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
            <Navigation className="w-3 h-3 mr-2" /> Localização
          </div>
          <h2 className="text-3xl font-bold text-foreground md:text-5xl mt-2">
            Como Chegar
          </h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-auto mx-auto px-2">
            Preparamos tudo com muito carinho e queremos que você chegue com facilidade.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Card className="overflow-hidden border-0 pt-0 shadow-2xl bg-background/60 backdrop-blur-xl ring-1 ring-border/50">
            {/* Mapa Interativo do Google Maps */}
            <div className="relative flex h-56 sm:h-80 w-full items-center justify-center overflow-hidden bg-muted/30">
              <iframe
                title="Local do Evento"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?hl=pt-BR&q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=B&output=embed`}
                className="absolute inset-0 z-10"
              />
            </div>

            <CardContent className="flex flex-col gap-6 pt-8 px-6 sm:px-10">
              <div className="grid sm:grid-cols-2 gap-8 items-start">
                {/* Detalhes do Local */}
                <div className="flex items-start gap-4">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 shadow-inner">
                    <MapPin className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
                      Condomínio Rio Coxipó
                    </h3>
                    <p className="text-xs md:text-sm font-medium leading-relaxed text-muted-foreground">
                      Av. das Palmeiras, 2026
                      <br />
                      Jardim Imperial, Cuiabá - MT
                    </p>
                  </div>
                </div>

                {/* Detalhes do Estacionamento */}
                <div className="flex items-start gap-4">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 shadow-inner">
                    <PartyPopper className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
                      Local do evento
                    </h3>
                    <p className="text-xs md:text-sm font-medium leading-relaxed text-muted-foreground">
                      Salão de festas, proximo a guarita do condomínio.
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="bg-primary/10" />

              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button asChild className="w-full cursor-pointer rounded-xl h-14 text-base font-semibold shadow-xl shadow-primary/20 text-white" size="lg">
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="size-5 mr-2" />
                    Abrir no Google Maps
                  </a>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
