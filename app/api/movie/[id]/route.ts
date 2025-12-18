import { getMovieDetails } from "@/lib/tmdb.server"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const movie = await getMovieDetails(Number.parseInt(id))
    return Response.json(movie)
  } catch (error) {
    return Response.json({ error: "Movie not found" }, { status: 404 })
  }
}
