import MovieDetails from "@/app/movies/[id]";

export interface Movie{
    id: number;
    title: string;
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    original_language: string;
    orginal_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    release_date: string;
    video: boolean;
    vote_count: number;
}


export interface TrendingMovie{
    movie_id: number;
    title: string;
    count: number;
    searchTerm: string;
    poster_url: string;
}

export interface TrendingCardInterface{
    movie: TrendingMovie,
    index: number;
}

export interface MovieDetails {
    runtime: number;
    genres: Array<{
        name: string;
    }>;
    production_companies: Array<{
        name: string;
    }>;
    budget: number;
    revenue: number;
}