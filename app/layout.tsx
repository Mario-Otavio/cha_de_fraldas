import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const _dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const _playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Cha de Fraldas da Luna',
  description:
    'Confirme sua presenca no Cha de Fraldas da Luna. Venha celebrar a chegada da nossa princesinha!',
}

export const viewport: Viewport = {
  themeColor: '#f9c5d1',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="font-sans antialiased">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            classNames: {
              toast: "group flex gap-3 w-fit bg-background/80 backdrop-blur-xl border border-primary/20 shadow-xl rounded-2xl p-4 ring-1 ring-primary/10 items-start top-4",
              title: "pl-4 text-foreground text-lg font-bold",
              description: "pl-4 text-muted-foreground text-sm font-medium",
              icon: "text-green-400 flex-shrink-0 mt-0.5 [&>svg]:size-10",
            },
          }}
        />
      </body>
    </html>
  )
}
