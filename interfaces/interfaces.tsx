import { Dispatch, SetStateAction } from "react";

export interface MovieDetails {
	adult: boolean;
	backdrop_path: string | null;
	belongs_to_collection?: {
		id: number;
		name: string;
		poster_path: string | null;
		backdrop_path: string | null;
	} | null;
	budget: number;
	genres: {
		id: number;
		name: string;
	}[];
	homepage: string;
	id: number;
	imdb_id: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	production_companies: {
		id: number;
		logo_path: string | null;
		name: string;
		origin_country: string;
	}[];
	production_countries: {
		iso_3166_1: string;
		name: string;
	}[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: {
		english_name: string;
		iso_639_1: string;
		name: string;
	}[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface ImageProps {
	aspect_ratio: number;
	height: number;
	width: number;
	file_path: string;
}

export interface ImageTypeProps {
	backdrops: ImageProps[];
	logos: ImageProps[];
	posters: ImageProps[];
}

export interface VideoItem {
	iso_639_1: string;
	iso_3166_1: string;
	name: string;
	key: string;
	site: string; // e.g., "YouTube"
	size: number;
	type: string; // e.g., "Trailer"
	official: boolean;
	published_at: string;
	id: string;
}

export interface TrendingMovie {
	movie_id: number;
	title: string;
	count: number;
	poster_url: string;
}

export interface TrendingCardInterface {
	movie: TrendingMovie;
	index: number;
}

export interface MovieOptions {
	include_adult?: boolean;
	include_video?: boolean;
	page?: number;
	sort_by?: string;
	language?: string;
	query?: string;
}
export interface SearchPageHeaderProps {
	searchQuery: string;
	setSearchQuery: Dispatch<SetStateAction<string>>;
	moviesLoading: boolean;
	moviesError: Error | null;
}
