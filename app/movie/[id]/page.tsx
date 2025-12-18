"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Play, Share2, Heart } from "lucide-react"
import { MovieCard } from "@/components/movie-card"

interface MovieDetails {
  id: number
  title: string
  year: number
  rating: number
  image: string
  description: string
  longDescription: string
  duration: number
  director: string
  cast: string[]
  genres: string[]
}

interface Movie {
  id: number
  title: string
  year: number
  rating: number
  image: string
}

interface MoviePageProps {
  params: Promise<{ id: string }>
}

export default function MoviePage({ params }: MoviePageProps) {
  const [id, setId] = useState("")
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const { id: movieId } = await params
      setId(movieId)

      try {
        const [movieRes, similarRes] = await Promise.all([
          fetch(`/api/movie/${movieId}`),
          fetch(`/api/similar/${movieId}`),
        ])

        if (movieRes.ok) {
          const movieData = await movieRes.json()
          setMovie(movieData)
        }

        if (similarRes.ok) {
          const similarData = await similarRes.json()
          setSimilarMovies(similarData.results.slice(0, 4))
        }
      } catch (error) {
        console.error("Failed to fetch movie:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center py-40">
          <div className="animate-spin w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full" />
        </div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center py-40">
          <p className="text-foreground text-lg">Movie not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <div className="relative h-96 md:h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${movie.image}')` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center px-4 md:px-8">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2 flex-wrap">
              {movie.genres.map((genre: string) => (
                <span key={genre} className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full">
                  {genre}
                </span>
              ))}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4">{movie.title}</h1>

            <div className="flex items-center gap-6 mb-6 text-sm md:text-base">
              <span className="flex items-center gap-2">
                <span className="text-accent font-bold text-lg">{movie.rating}</span>
                <span className="text-muted-foreground">Rating</span>
              </span>
              <span className="text-muted-foreground">{movie.year}</span>
              <span className="text-muted-foreground">{movie.duration} min</span>
            </div>

            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl">{movie.description}</p>

            <div className="flex gap-4">
              <Button size="lg" className="gap-2">
                <Play className="w-5 h-5" />
                Watch Now
              </Button>
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                <Heart className="w-5 h-5" />
                Add to Watchlist
              </Button>
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                <Share2 className="w-5 h-5" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="px-4 md:px-8 py-16">
        <div className="max-w-4xl">
          {/* Overview */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">{movie.longDescription}</p>
          </div>

          {/* Cast and Crew */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Director</h3>
              <p className="text-foreground">{movie.director}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Cast</h3>
              <ul className="space-y-2">
                {movie.cast.map((actor: string) => (
                  <li key={actor} className="text-foreground">
                    {actor}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Similar Movies */}
          {similarMovies.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Similar Titles</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {similarMovies.map((movie) => (
                  <div key={movie.id}>
                    <MovieCard {...movie} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
