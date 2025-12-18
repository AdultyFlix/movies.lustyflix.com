"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchInput, setSearchInput] = useState("")

  const genres = ["Action", "Adventure", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller"]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchInput)}`
    }
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border/30 bg-gradient-to-b from-background/95 via-background/90 to-background/80 backdrop-blur-2xl">
      <div className="flex items-center justify-between px-4 py-4 md:px-12">
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-accent via-accent/70 to-primary/80 bg-clip-text text-transparent"
        >
          CineMax
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-10 md:flex">
          <Link href="/" className="text-foreground/75 hover:text-accent transition-colors font-medium text-sm">
            Home
          </Link>
          <Link href="/movies" className="text-foreground/75 hover:text-accent transition-colors font-medium text-sm">
            Movies
          </Link>
          <Link href="/genres" className="text-foreground/75 hover:text-accent transition-colors font-medium text-sm">
            Genres
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="hidden sm:flex items-center gap-2">
              <input
                type="text"
                placeholder="Search titles..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                autoFocus
                className="px-4 py-2 bg-accent/10 backdrop-blur-sm border border-accent/30 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-foreground/70 hover:text-accent transition"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          ) : (
            <button onClick={() => setIsSearchOpen(true)} className="text-foreground/70 hover:text-accent transition">
              <Search className="w-5 h-5" />
            </button>
          )}
          <Button
            variant="outline"
            asChild
            className="hidden sm:flex bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground border-0 font-semibold"
          >
            <Link href="/login">Sign In</Link>
          </Button>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-foreground/70" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-border/20 bg-card/40 backdrop-blur-2xl p-4 md:hidden space-y-3">
          <Link href="/search" className="block text-foreground/80 hover:text-accent font-medium">
            Search
          </Link>
          <Link href="/" className="block text-foreground/80 hover:text-accent font-medium">
            Home
          </Link>
          <Link href="/movies" className="block text-foreground/80 hover:text-accent font-medium">
            Movies
          </Link>
          <Link href="/genres" className="block text-foreground/80 hover:text-accent font-medium">
            Genres
          </Link>
        </div>
      )}
    </nav>
  )
}
