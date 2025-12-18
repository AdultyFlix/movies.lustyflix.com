"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

const genres = [
  { name: "Action", color: "bg-red-600" },
  { name: "Adventure", color: "bg-orange-600" },
  { name: "Animation", color: "bg-purple-600" },
  { name: "Comedy", color: "bg-yellow-600" },
  { name: "Crime", color: "bg-gray-700" },
  { name: "Documentary", color: "bg-blue-600" },
  { name: "Drama", color: "bg-indigo-600" },
  { name: "Fantasy", color: "bg-pink-600" },
  { name: "Horror", color: "bg-red-900" },
  { name: "Romance", color: "bg-rose-600" },
  { name: "Sci-Fi", color: "bg-cyan-600" },
  { name: "Thriller", color: "bg-slate-700" },
]

export function GenreGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {genres.map((genre) => (
        <Link key={genre.name} href={`/genre/${genre.name.toLowerCase()}`}>
          <Button
            variant="outline"
            className={`w-full h-24 text-lg font-semibold hover:scale-105 transition-transform ${genre.color} text-white border-0 hover:brightness-110`}
          >
            {genre.name}
          </Button>
        </Link>
      ))}
    </div>
  )
}
