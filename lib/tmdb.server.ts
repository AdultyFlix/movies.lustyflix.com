"use server"

const TMDB_API_KEY = process.env.TMDB_API_KEY
const TMDB_BASE_URL = "https://api.themoviedb.org/3"

interface TMDBMovie {
  id: number
  title: string
  poster_path: string
  release_date: string
  vote_average: number
  overview: string
  genre_ids?: number[]
}

interface TMDBMovieDetails extends TMDBMovie {
  runtime: number
  budget: number
  revenue: number
  credits: {
    cast: Array<{ name: string; character: string }>
    crew: Array<{ name: string; job: string }>
  }
  genres: Array<{ id: number; name: string }>
}

export async function fetchTMDB<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
  if (!TMDB_API_KEY) {
    throw new Error("TMDB_API_KEY is not set")
  }

  const url = new URL(`${TMDB_BASE_URL}${endpoint}`)
  url.searchParams.append("api_key", TMDB_API_KEY)

  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, String(value))
  })

  const response = await fetch(url.toString(), { next: { revalidate: 3600 } })

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`)
  }

  return response.json()
}

export async function discoverMovies(page = 1, genreId?: number) {
  const data = await fetchTMDB<{
    results: TMDBMovie[]
    total_pages: number
  }>("/discover/movie", {
    page,
    sort_by: "popularity.desc",
    with_genres: genreId,
  })

  return data.results.map(transformMovie)
}

export async function trendingMovies(page = 1) {
  const data = await fetchTMDB<{
    results: TMDBMovie[]
    total_pages: number
  }>("/trending/movie/week", {
    page,
  })

  return data.results.map(transformMovie)
}

export async function searchMovies(query: string, page = 1) {
  const data = await fetchTMDB<{
    results: TMDBMovie[]
    total_pages: number
  }>("/search/movie", {
    query,
    page,
  })

  return data.results.map(transformMovie)
}

export async function getMovieDetails(id: number) {
  const data = await fetchTMDB<TMDBMovieDetails>(`/movie/${id}`, {
    append_to_response: "credits",
  })

  return transformMovieDetails(data)
}

export async function getSimilarMovies(id: number, page = 1) {
  const data = await fetchTMDB<{
    results: TMDBMovie[]
    total_pages: number
  }>(`/movie/${id}/similar`, {
    page,
  })

  return data.results.map(transformMovie)
}

function transformMovie(movie: TMDBMovie) {
  return {
    id: movie.id,
    title: movie.title,
    year: new Date(movie.release_date).getFullYear(),
    rating: Math.round(movie.vote_average * 10) / 10,
    image: movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : "/placeholder.svg",
    description: movie.overview,
  }
}

function transformMovieDetails(movie: TMDBMovieDetails) {
  const director = movie.credits?.crew?.find((c) => c.job === "Director")
  const cast = movie.credits?.crew?.slice(0, 5).map((c) => c.name) || []

  return {
    ...transformMovie(movie),
    duration: movie.runtime,
    director: director?.name || "Unknown",
    cast,
    genres: movie.genres?.map((g) => g.name) || [],
    longDescription: movie.overview,
  }
}
