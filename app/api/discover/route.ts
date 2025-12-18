import { discoverMovies } from "@/lib/tmdb.server"
import { getGenreId } from "@/lib/genre-mapping"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const genre = searchParams.get("genre")

  try {
    const genreId = genre ? getGenreId(genre) : undefined
    const movies = await discoverMovies(page, genreId)
    return Response.json({
      results: movies,
      totalPages: 500,
      currentPage: page,
    })
  } catch (error) {
    return Response.json({ error: "Failed to fetch movies" }, { status: 500 })
  }
}
