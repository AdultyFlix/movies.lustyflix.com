import { searchMovies } from "@/lib/tmdb.server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")
  const page = Number.parseInt(searchParams.get("page") || "1")

  if (!query) {
    return Response.json({ error: "Query parameter required" }, { status: 400 })
  }

  try {
    const movies = await searchMovies(query, page)
    return Response.json({ results: movies })
  } catch (error) {
    return Response.json({ error: "Failed to search movies" }, { status: 500 })
  }
}
