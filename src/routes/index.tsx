import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { HomeHero } from "@/features/home/HomeHero";
import { Benefits, Destinations, FeaturedTours, FinalCta, RecommendedHotels, Testimonials } from "@/features/home/HomeSections";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "DMGOTRAVEL — Viajes que se sienten" }, { name: "description", content: "Experiencias en Ayacucho, Cusco, Arequipa, Lima y Millpu con DMGOTRAVEL." }, { property: "og:title", content: "DMGOTRAVEL — Viajes que se sienten" }, { property: "og:description", content: "Experiencias en Ayacucho, Cusco, Arequipa, Lima y Millpu con DMGOTRAVEL." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: () => (
    <PublicLayout>
      <HomeHero /><FeaturedTours /><Destinations /><RecommendedHotels /><Benefits /><Testimonials /><FinalCta />
    </PublicLayout>
  ),
});