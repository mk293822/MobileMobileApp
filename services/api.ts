import {
	ImageTypeProps,
	MovieDetails,
	MovieOptions,
	VideoItem,
} from "@/interfaces/interfaces";

export const { BASE_URL, API_KEY, headers } = {
	BASE_URL: "https://api.themoviedb.org/3",
	API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
	headers: {
		Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
		accept: "application/json",
	},
};

export const fetchImages = async (movieId: number): Promise<ImageTypeProps> => {
	try {
		const response = await fetch(`${BASE_URL}/movie/${movieId}/images`, {
			method: "GET",
			headers: headers,
		});

		if (!response.ok) throw new Error("Error fection Movies");

		return await response.json();
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const fetchVideo = async (movieId: number): Promise<VideoItem[]> => {
	try {
		const response = await fetch(`${BASE_URL}/movie/${movieId}/videos`, {
			method: "GET",
			headers: headers,
		});

		if (!response.ok) throw new Error("Error fection Movies");

		const data = await response.json();

		return data.results;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const fetchMovie = async (options?: MovieOptions) => {
	const {
		query = "",
		include_adult = false,
		include_video = false,
		sort_by = "popularity.desc",
		page = 1,
		language = "en-US",
	} = options || {};

	const endpoint = query.trim()
		? `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=${include_adult}&language=${language}&page=${page}`
		: `${BASE_URL}/discover/movie?include_adult=${include_adult}&include_video=${include_video}&language=${language}&page=${page}&sort_by=${sort_by}`;

	const response = await fetch(endpoint, {
		method: "GET",
		headers: headers,
	});

	if (!response.ok) {
		throw new Error(`Error fetching movie: ${response.statusText}`);
	}

	const data = await response.json();

	return data.results as MovieDetails[];
};

export const fetchMovieDetails = async (
	movieId: string
): Promise<MovieDetails> => {
	try {
		const response = await fetch(
			`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`,
			{
				method: "GET",
				headers: headers,
			}
		);

		if (!response.ok) throw new Error("Failed to fetch movie details");

		const data = await response.json();

		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
