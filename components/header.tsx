"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Menu, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { label: "Detalhes", href: "#detalhes" },
  { label: "Confirmar", href: "#confirmar" },
  { label: "Local", href: "#local" },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg"
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 lg:px-8">
        <a href="#" className="flex items-center gap-2">
          <Heart className="size-5 text-primary" fill="currentColor" />
          <span className="text-lg font-semibold text-foreground">
            {"Luna Mendes Belmonte Dorilêo"}
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Button asChild size="sm" className="cursor-pointer rounded-full">
            <a href="#confirmar">Confirmar presença</a>
          </Button>
        </nav>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Abrir menu" className="cursor-pointer">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 font-serif">
                <Heart className="size-4 text-primary" fill="currentColor" />
                Menu
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 px-4 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="mt-2 w-full cursor-pointer" onClick={() => setOpen(false)}>
                <a href="#confirmar">Confirmar presença</a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  )
}
