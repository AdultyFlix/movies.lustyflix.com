"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { MovieCard } from "./movie-card"

interface Movie {
  id: number
  title: string
  year: number
  rating: number
  image: string
}

interface ContentCarouselProps {
  title: string
  genre?: string
  endpoint?: string
  viewMoreLink?: string
}

export function ContentCarousel({ title, genre, endpoint, viewMoreLink }: ContentCarouselProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [scrollPosition, setScrollPosition] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = endpoint || `/api/discover?genre=${genre || "action"}`
        const response = await fetch(url)
        const data = await response.json()
        setMovies(data.results)
      } catch (error) {
        console.error("Failed to fetch movies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [genre, endpoint])

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById(`carousel-${title.replace(/\s+/g, "-")}`)
    if (container) {
      const scrollAmount = 400
      const newPosition = direction === "right" ? scrollPosition + scrollAmount : scrollPosition - scrollAmount
      container.scrollTo({ left: newPosition, behavior: "smooth" })
      setScrollPosition(newPosition)
    }
  }

  if (loading) {
    return (
      <section className="relative">
        <h2 className="mb-6 text-2xl font-bold text-foreground">{title}</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-48 h-72 bg-muted rounded-2xl animate-pulse" />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {viewMoreLink && (
          <Link
            href={viewMoreLink}
            className="text-accent hover:text-accent/80 transition-colors text-sm font-semibold"
          >
            See More →
          </Link>
        )}
      </div>

      <div className="relative group">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-8 h-8 text-foreground hover:text-accent" />
        </button>

        {/* Carousel */}
        <div
          id={`carousel-${title.replace(/\s+/g, "-")}`}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0">
              <MovieCard {...movie} />
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-8 h-8 text-foreground hover:text-accent" />
        </button>
      </div>
    </section>
  )
}
