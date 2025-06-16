import { MovieDetails } from "@/interfaces/interfaces";
import { Movie } from '../interfaces/interfaces';

export const TMDB_Config = {
	BASE_URL: "https://api.themoviedb.org/3",
	API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
	headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
        accept: 'application/json'
	},
};


export const fetchMovie = async ({ query }: { query: string }) => {
    const endpoint = query
			? `${TMDB_Config.BASE_URL}/search/movie?query=${encodeURIComponent(
					query
			  )}`
			: `${TMDB_Config.BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
        method: "GET",
        headers: TMDB_Config.headers
    });

    if (!response.ok) {
        throw new Error(`Error fetching movie: ${response.statusText}`);
    }

    const data = await response.json();

    return data.results;
}

export const fetchMovieDetails = async (movieId: string): Promise<Movie & MovieDetails> => {
    try {
        const response = await fetch(`${TMDB_Config.BASE_URL}/movie/${movieId}?api_key=${TMDB_Config.API_KEY}`, {
            method: "GET",
            headers: TMDB_Config.headers
        });

        if (!response.ok) throw new Error("Failed to fetch movie details");

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}