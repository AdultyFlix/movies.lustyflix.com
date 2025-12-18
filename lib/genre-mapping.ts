export const genreNameToId: Record<string, number> = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  fantasy: 14,
  horror: 27,
  romance: 10749,
  "sci-fi": 878,
  "science-fiction": 878,
  scifi: 878,
  thriller: 53,
  mystery: 9648,
  family: 10751,
  war: 10752,
  western: 37,
}

export const genreIdToName: Record<number, string> = {
  28: "action",
  12: "adventure",
  16: "animation",
  35: "comedy",
  80: "crime",
  99: "documentary",
  18: "drama",
  14: "fantasy",
  27: "horror",
  10749: "romance",
  878: "sci-fi",
  53: "thriller",
  9648: "mystery",
  10751: "family",
  10752: "war",
  37: "western",
}

export function getGenreId(genreName: string): number | undefined {
  return genreNameToId[genreName.toLowerCase()]
}

export function getGenreName(genreId: number): string | undefined {
  return genreIdToName[genreId]
}
