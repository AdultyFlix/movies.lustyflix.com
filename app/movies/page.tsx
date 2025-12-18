"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { MovieCard } from "@/components/movie-card"
import { Button } from "@/components/ui/button"
import { Filter, ChevronDown } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Movie {
  id: number
  title: string
  year: number
  rating: number
  image: string
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/discover?page=${currentPage}`)
        const data = await response.json()
        setMovies(data.results)
        setTotalPages(data.totalPages || 500)
      } catch (error) {
        console.error("Failed to fetch movies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [currentPage])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <div className="border-b border-border bg-card/50 py-8 px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Movies</h1>
        <p className="text-muted-foreground">
          {loading ? "Loading..." : `Explore our collection of movies - Page ${currentPage}`}
        </p>
      </div>

      {/* Filters and Content */}
      <div className="px-4 md:px-6 py-8">
        {/* Filter Bar */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              Filter
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              Sort By
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">{movies.length} results</p>
        </div>

        {/* Movies Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-full h-72 bg-muted rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <div key={movie.id}>
                <MovieCard {...movie} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && movies.length > 0 && (
          <div className="mt-12">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(currentPage - 1)
                        window.scrollTo(0, 0)
                      }}
                    />
                  </PaginationItem>
                )}

                {Array.from({
                  length: Math.min(5, totalPages),
                }).map((_, i) => {
                  let pageNum = currentPage - 2 + i
                  if (pageNum < 1) pageNum = i + 1
                  if (pageNum > totalPages) return null

                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href="#"
                        isActive={pageNum === currentPage}
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentPage(pageNum)
                          window.scrollTo(0, 0)
                        }}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}

                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(currentPage + 1)
                        window.scrollTo(0, 0)
                      }}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  )
}
