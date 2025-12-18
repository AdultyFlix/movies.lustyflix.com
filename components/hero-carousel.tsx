"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

const heroItems = [
  {
    id: 1,
    title: "Deadpool & Wolverine",
    year: 2024,
    rating: 8.5,
    description: "Merc with a mouth meets the adamantium-clawed mutant in this action-packed adventure.",
    image: "/deadpool-wolverine-movie-poster.jpg",
  },
  {
    id: 2,
    title: "Late Night with the Devil",
    year: 2024,
    rating: 9.3,
    description: "A lost episode of a late-night talk show from 1977 resurfaces after decades.",
    image: "/late-night-with-devil-movie.jpg",
  },
  {
    id: 3,
    title: "The Substance",
    year: 2024,
    rating: 8.2,
    description: "A provocative and surreal exploration of beauty, age, and transformation.",
    image: "/the-substance-movie-poster.jpg",
  },
]

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroItems.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [autoPlay])

  const next = () => {
    setCurrent((prev) => (prev + 1) % heroItems.length)
    setAutoPlay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + heroItems.length) % heroItems.length)
    setAutoPlay(false)
  }

  const item = heroItems[current]

  return (
    <div
      className="relative h-96 md:h-screen overflow-hidden bg-gradient-to-br from-primary/30 via-background to-background"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      {heroItems.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${slide.image}')` }}>
            <div className="absolute inset-0 bg-gradient-to-r from-background from-0% via-background/50 via-40% to-transparent to-100%" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent" />
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="px-4 md:px-16 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 leading-tight tracking-tight">
            {item.title}
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 mb-8 leading-relaxed max-w-2xl font-light">
            {item.description}
          </p>
          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-gradient-to-r from-accent/20 to-accent/10 backdrop-blur-xl px-4 py-2.5 rounded-full border border-accent/30">
              <span className="text-accent font-bold text-lg">{item.rating}</span>
              <span className="text-sm text-foreground/70">Rating</span>
            </div>
            <span className="text-foreground/60 font-medium">{item.year}</span>
          </div>
          <div className="flex gap-4">
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground font-bold shadow-lg shadow-accent/30 rounded-xl px-8"
            >
              <Play className="w-5 h-5 fill-current" />
              Watch Now
            </Button>
            <Button
              size="lg"
              className="gap-2 bg-primary/20 hover:bg-primary/30 border border-primary/40 text-foreground font-bold backdrop-blur-xl rounded-xl px-8"
            >
              <Info className="w-5 h-5" />
              More Info
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 bg-primary/30 hover:bg-primary/50 backdrop-blur-xl text-white p-3 rounded-full transition-all hover:scale-110 border border-primary/50"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 bg-primary/30 hover:bg-primary/50 backdrop-blur-xl text-white p-3 rounded-full transition-all hover:scale-110 border border-primary/50"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {heroItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrent(idx)
              setAutoPlay(false)
            }}
            className={`transition-all ${
              idx === current
                ? "bg-accent w-8 h-2.5 rounded-full shadow-lg shadow-accent/50"
                : "bg-white/20 w-2.5 h-2.5 rounded-full hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
