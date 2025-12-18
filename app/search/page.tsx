"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { MovieCard } from "@/components/movie-card"
import { SearchIcon, X } from "lucide-react"

interface Movie {
  id: number
  title: string
  year: number
  rating: number
  image: string
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredResults, setFilteredResults] = useState<Movie[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      setLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        setFilteredResults(data.results)
        setHasSearched(true)
      } catch (error) {
        console.error("Search failed:", error)
        setFilteredResults([])
      } finally {
        setLoading(false)
      }
    } else {
      setFilteredResults([])
      setHasSearched(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Search Header */}
      <div className="border-b border-border bg-card/50 py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold text-foreground mb-6">Search</h1>

        {/* Search Input */}
        <div className="relative max-w-2xl">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search movies and TV shows..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="px-4 md:px-6 py-12">
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-full h-72 bg-muted rounded-2xl animate-pulse" />
            ))}
          </div>
        )}

        {hasSearched && !loading && filteredResults.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-4">No results found for "{searchQuery}"</p>
            <p className="text-muted-foreground">Try searching for different keywords</p>
          </div>
        )}

        {filteredResults.length > 0 && !loading && (
          <>
            <p className="text-muted-foreground mb-6">
              Found {filteredResults.length} result{filteredResults.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {filteredResults.map((movie) => (
                <div key={movie.id}>
                  <MovieCard {...movie} />
                </div>
              ))}
            </div>
          </>
        )}

        {!hasSearched && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">Start typing to search</p>
          </div>
        )}
      </div>
    </div>
  )
}
