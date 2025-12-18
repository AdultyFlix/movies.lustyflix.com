import { Navigation } from "@/components/navigation"
import { HeroCarousel } from "@/components/hero-carousel"
import { ContentCarousel } from "@/components/content-carousel"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroCarousel />

      <div className="space-y-12 px-4 py-16 md:px-6">
        <ContentCarousel title="Trending Now" endpoint="/api/discover?page=1" />

        <ContentCarousel title="Action Movies" genre="action" viewMoreLink="/genre/action" />

        <ContentCarousel title="Comedy Movies" genre="comedy" viewMoreLink="/genre/comedy" />

        <ContentCarousel title="Fantasy Movies" genre="fantasy" viewMoreLink="/genre/fantasy" />

        <ContentCarousel title="Sci-Fi Movies" genre="sci-fi" viewMoreLink="/genre/sci-fi" />

        <ContentCarousel title="Horror Movies" genre="horror" viewMoreLink="/genre/horror" />

        <ContentCarousel
          title="Latest Movies"
          endpoint="/api/discover?sort_by=release_date.desc"
          viewMoreLink="/movies"
        />
      </div>
    </div>
  )
}
