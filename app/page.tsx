import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { DetailsSection } from "@/components/details-section"
import { RSVPForm } from "@/components/rsvp-form"
import { LocationSection } from "@/components/location-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <DetailsSection />
      <RSVPForm />
      <LocationSection />
      <Footer />
    </main>
  )
}
