import { getSimilarMovies } from "@/lib/tmdb.server"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")

  try {
    const movies = await getSimilarMovies(Number.parseInt(id), page)
    return Response.json({ results: movies })
  } catch (error) {
    return Response.json({ error: "Failed to fetch similar movies" }, { status: 500 })
  }
}
