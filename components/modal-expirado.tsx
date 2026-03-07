"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface ModalExpiradoProps {
    aberto: boolean
    setAberto: (aberto: boolean) => void
}

export function ModalExpirado({ aberto, setAberto }: ModalExpiradoProps) {
    return (
        <Dialog open={aberto} onOpenChange={setAberto}>
            <DialogContent className="sm:max-w-md border-primary/20 bg-background/95 backdrop-blur-xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-primary">Período encerrado</DialogTitle>
                    <DialogDescription className="text-base text-muted-foreground pt-2 text-justify">
                        O período de confirmação pelo site já encerrou. Por favor entre em contato diretamente com os pais por WhatsApp.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 pt-6">
                    <Button
                        asChild
                        className="w-full h-12 bg-[#25D366] hover:bg-[#20b858] text-white font-semibold rounded-xl"
                    >
                        <a
                            href="https://wa.me/5565992240822?text=Ol%C3%A1!%20Vi%20no%20site%20que%20o%20prazo%20de%20confirma%C3%A7%C3%A3o%20do%20Ch%C3%A1%20de%20Beb%C3%AA%20da%20Luna%20encerrou.%20Ainda%20%C3%A9%20poss%C3%ADvel%3F"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 shrink-0"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg>
                            Falar com a Mãe
                        </a>
                    </Button>

                    <Button
                        asChild
                        className="w-full h-12 bg-[#25D366] hover:bg-[#20b858] text-white font-semibold rounded-xl"
                    >
                        <a
                            href="https://wa.me/5565998153363?text=Ol%C3%A1!%20Vi%20no%20site%20que%20o%20prazo%20de%20confirma%C3%A7%C3%A3o%20do%20Ch%C3%A1%20de%20Beb%C3%AA%20da%20Luna%20encerrou.%20Ainda%20%C3%A9%20poss%C3%ADvel%3F"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 shrink-0"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg>
                            Falar com o Pai
                        </a>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
