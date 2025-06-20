import React, { useState, useEffect, useMemo, useCallback } from "react";
import useFetch from "@/hooks/useFetch";
import { fetchMovie } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import { ActivityIndicator, SafeAreaView, Text } from "react-native";
import { MovieDetails, TrendingMovie } from "@/interfaces/interfaces";
import debounce from "lodash.debounce";
import HomePageMovieBody from "@/components/homePageMovieBody";

const Index = () => {
	const {
		data: trendingMovies,
		loading: trendingLoading,
		error: trendingError,
		refetch,
	} = useFetch(getTrendingMovies, true);

	const {
		data: movies,
		loading: moviesLoading,
		error: moviesError,
	} = useFetch(fetchMovie, true);

	const [refreshing, setRefreshing] = useState(false);
	const [loadMore, setLoadingMore] = useState(false);
	const [renderMovies, setRenderMovies] = useState<MovieDetails[] | null>(
		movies
	);
	const [renderTrendingMovies, setRenderTrendingMovies] = useState<
		TrendingMovie[] | undefined | null
	>(trendingMovies);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		setRenderMovies(movies || []);
	}, [movies]);

	useEffect(() => {
		setRenderTrendingMovies(trendingMovies || []);
	}, [trendingMovies]);

	const onRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};

	const handleMovieEndReached = useCallback(async () => {
		if (loadMore || !hasMore) return;
		setLoadingMore(true);

		try {
			const newMovies = await fetchMovie({
				page: page + 1,
				include_adult: false,
			});

			if (!newMovies || newMovies.length === 0) {
				setHasMore(false); // no more data to fetch
			} else {
				setRenderMovies((prev) => [...(prev ?? []), ...newMovies]);
				setPage((prev) => prev + 1);
			}
		} catch (error) {
			console.error("Failed to load more movies", error);
		} finally {
			setLoadingMore(false);
		}
	}, [loadMore, hasMore, page]);

	const debounceHandleMovieEndReached = useMemo(
		() => debounce(handleMovieEndReached, 1000),
		[handleMovieEndReached]
	);

	useEffect(() => {
		return () => debounceHandleMovieEndReached.cancel();
	}, [debounceHandleMovieEndReached]);

	return (
		<SafeAreaView className="flex-1 bg-primary items-center justify-center">
			{moviesLoading || trendingLoading ? (
				<ActivityIndicator size={"large"} color={"#0000ff"} className="my-3" />
			) : moviesError || trendingError ? (
				<Text>{moviesError?.message || trendingError?.message}</Text>
			) : (
				<HomePageMovieBody
					renderTrendingMovies={renderTrendingMovies}
					renderMovies={renderMovies ?? []}
					handleMovieEndReached={debounceHandleMovieEndReached}
					refreshing={refreshing}
					onRefresh={onRefresh}
					hasMore={hasMore}
					loadMore={loadMore}
				/>
			)}
		</SafeAreaView>
	);
};

export default Index;
