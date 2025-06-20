import { View, FlatList, Text, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { fetchMovie } from "@/services/api";
import useFetch from "@/hooks/useFetch";
import MovieCard from "@/components/movieCard";
import SearchPageHeader from "@/components/searchPageHeader";
import debounce from "lodash.debounce";
import { MovieDetails } from "@/interfaces/interfaces";

const search = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [loadMore, setLoadingMore] = useState(false);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [renderMovies, setRenderMovies] = useState<MovieDetails[] | null>([]);
	const {
		loading: moviesLoading,
		error: moviesError,
		refetch: loadMovies,
		reset,
	} = useFetch(() => fetchMovie({ query: searchQuery }), false);

	useEffect(() => {
		const debounceLoadMovies = debounce(async () => {
			if (searchQuery.trim()) {
				const movies = await loadMovies();
				setRenderMovies(movies);
				setPage(2);
			} else {
				reset();
				setRenderMovies([]);
			}
		}, 1000);

		debounceLoadMovies();

		return () => debounceLoadMovies.cancel();
	}, [searchQuery]);

	const handleMovieEndReached = useCallback(
		debounce(async () => {
			if (loadMore || !hasMore) return;
			setLoadingMore(true);

			try {
				const newMovies = await fetchMovie({
					page: page + 1,
					query: searchQuery,
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
		}, 1000),
		[loadMore, hasMore, page]
	);

	useEffect(() => {
		return () => handleMovieEndReached.cancel();
	}, [handleMovieEndReached]);

	const renderMovieCards = useCallback(
		({ item }: { item: MovieDetails }) => <MovieCard {...item} />,
		[]
	);

	const footerComponents = useCallback(() => {
		if (hasMore) {
			return (
				loadMore && (
					<View className="mb-12">
						<ActivityIndicator size={"large"} color={"#0000ff"} />
					</View>
				)
			);
		} else {
			return (
				searchQuery.trim() && (
					<View className="my-8">
						<Text className="text-white font-bold text-xl">No More Movies</Text>
					</View>
				)
			);
		}
	}, [loadMore, hasMore]);

	return (
		<View className="flex-1 bg-primary items-center justify-center">
			<FlatList
				className="flex-1 w-full mt-3"
				data={renderMovies}
				renderItem={renderMovieCards}
				keyExtractor={(item) => item.id.toString()}
				numColumns={3}
				windowSize={5}
				initialNumToRender={12}
				maxToRenderPerBatch={12}
				removeClippedSubviews={true}
				updateCellsBatchingPeriod={100}
				columnWrapperStyle={{
					justifyContent: "flex-start",
					gap: 20,
					paddingRight: 5,
					marginBottom: 10,
				}}
				ListFooterComponent={footerComponents}
				contentContainerStyle={{ padding: 20 }}
				ListEmptyComponent={
					!moviesLoading && !moviesError ? (
						<View className="mt-10 px-5">
							<Text className="text-center text-gray-500">
								{searchQuery.trim() ? "No Movie Found" : "Search for a Movie"}
							</Text>
						</View>
					) : null
				}
				ListHeaderComponent={
					<SearchPageHeader
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						moviesError={moviesError}
						moviesLoading={moviesLoading}
					/>
				}
				onEndReached={() => {
					if (
						!loadMore &&
						hasMore &&
						!moviesError &&
						!moviesLoading &&
						renderMovies &&
						renderMovies.length > 19
					)
						handleMovieEndReached();
				}}
				onEndReachedThreshold={0.3}
			/>
		</View>
	);
};

export default search;
