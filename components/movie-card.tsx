"use client"

import { useState } from "react"
import Link from "next/link"
import { Play, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MovieCardProps {
  id: number
  title: string
  year: number
  rating: number
  image: string
}

export function MovieCard({ id, title, year, rating, image }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/movie/${id}`}>
      <div
        className="relative w-48 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/40 to-secondary/20 group cursor-pointer ring-1 ring-accent/30 hover:ring-accent/60 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/30 hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity" />

          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-gradient-to-r from-accent to-accent/70 backdrop-blur-lg px-3 py-2 rounded-lg shadow-lg shadow-accent/40">
            <Star className="w-4 h-4 fill-current text-accent-foreground" />
            <span className="text-xs font-bold text-accent-foreground">{rating}</span>
          </div>
        </div>

        {/* Hover Content */}
        {isHovered && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-t from-black/80 via-black/50 to-black/30 backdrop-blur-sm">
            <div className="flex gap-3">
              <Button
                size="icon"
                className="rounded-full w-14 h-14 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground font-bold shadow-lg shadow-accent/50"
              >
                <Play className="w-6 h-6 fill-current" />
              </Button>
            </div>
            <p className="text-center text-sm font-semibold text-foreground px-3">{title}</p>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 bg-gradient-to-t from-black/90 to-black/40 backdrop-blur-sm">
          <p className="text-sm font-bold text-foreground truncate">{title}</p>
          <div className="flex items-center justify-between text-xs text-foreground/70 mt-2 font-medium">
            <span>{year}</span>
            <span className="text-accent font-bold">{rating}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
