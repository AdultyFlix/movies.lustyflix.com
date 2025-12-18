import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const allGenres = [
  { name: "Action", color: "from-blue-500 to-cyan-600" },
  { name: "Adventure", color: "from-cyan-500 to-blue-600" },
  { name: "Animation", color: "from-purple-600 to-blue-700" },
  { name: "Comedy", color: "from-yellow-500 to-orange-600" },
  { name: "Crime", color: "from-slate-700 to-blue-900" },
  { name: "Documentary", color: "from-blue-600 to-cyan-700" },
  { name: "Drama", color: "from-indigo-600 to-blue-700" },
  { name: "Fantasy", color: "from-purple-500 to-blue-600" },
  { name: "Horror", color: "from-red-700 to-blue-900" },
  { name: "Romance", color: "from-rose-600 to-blue-600" },
  { name: "Sci-Fi", color: "from-cyan-600 to-blue-700" },
  { name: "Thriller", color: "from-slate-800 to-cyan-900" },
  { name: "Mystery", color: "from-amber-800 to-blue-900" },
  { name: "Family", color: "from-green-600 to-blue-600" },
  { name: "War", color: "from-gray-700 to-blue-800" },
  { name: "Western", color: "from-yellow-800 to-orange-900" },
]

export const metadata = {
  title: "All Genres - CineMax",
  description: "Browse all movie and TV show genres on CineMax. Discover your next favorite content.",
}

export default function GenresPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-accent/20 bg-gradient-to-b from-background via-accent/5 to-background px-4 py-16 md:px-6 md:py-24">
        <div className="absolute inset-0 bg-gradient-radial from-accent/15 via-transparent to-transparent opacity-50" />
        <div className="relative max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance">
            Explore All{" "}
            <span className="bg-gradient-to-r from-accent via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Genres
            </span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Discover movies and TV shows across 16 different genres. Find exactly what you're in the mood to watch.
          </p>
        </div>
      </div>

      {/* Genres Grid */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allGenres.map((genre) => (
            <Link key={genre.name} href={`/genre/${genre.name.toLowerCase()}`}>
              <Button
                className={`w-full h-32 text-xl font-bold bg-gradient-to-br ${genre.color} hover:shadow-2xl hover:shadow-accent/50 text-white border-0 transition-all duration-300 hover:scale-105 hover:-translate-y-1 rounded-2xl relative overflow-hidden group shadow-lg`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">{genre.name}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-t border-accent/20 bg-gradient-to-b from-card/50 to-card/20 backdrop-blur-sm px-4 md:px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="group cursor-default">
            <div className="text-4xl font-bold bg-gradient-to-r from-accent to-cyan-400 bg-clip-text text-transparent mb-2">
              16+
            </div>
            <p className="text-foreground/70">Genres</p>
          </div>
          <div className="group cursor-default">
            <div className="text-4xl font-bold bg-gradient-to-r from-accent to-cyan-400 bg-clip-text text-transparent mb-2">
              10K+
            </div>
            <p className="text-foreground/70">Titles</p>
          </div>
          <div className="group cursor-default">
            <div className="text-4xl font-bold bg-gradient-to-r from-accent to-cyan-400 bg-clip-text text-transparent mb-2">
              Updated
            </div>
            <p className="text-foreground/70">Weekly</p>
          </div>
        </div>
      </div>
    </div>
  )
}
