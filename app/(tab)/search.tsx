import { View, FlatList, ActivityIndicator, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchMovie } from "@/services/api";
import useFetch from "@/hooks/useFetch";
import SearchBar from "@/components/searchBar";
import MovieCard from "@/components/movieCard";
import { updateSearchCount } from "@/services/appwrite";

const search = () => {
	const [searchQuery, setSearchQuery] = useState("");

	const {
		data: movies,
		loading: moviesLoading,
		error: moviesError,
		refetch: loadMovies,
		reset,
	} = useFetch(() => fetchMovie({ query: searchQuery }), false);

	useEffect(() => {
		const timeOutId = setTimeout(async () => {
			if (searchQuery) {
				await loadMovies();
			} else {
				reset();
			}
		}, 1000);

		return () => clearTimeout(timeOutId);
	}, [searchQuery]);

	useEffect(() => {
		if (movies?.length > 0 && movies?.[0]) {
			updateSearchCount(searchQuery, movies[0]);
		}
	}, [movies]);

	return (
		<View className="flex-1 bg-primary items-center justify-center">
			<FlatList
				className="flex-1 w-full mt-3"
				data={movies}
				renderItem={({ item }) => <MovieCard {...item} />}
				keyExtractor={(item) => item.id.toString()}
				numColumns={3}
				columnWrapperStyle={{
					justifyContent: "flex-start",
					gap: 20,
					paddingRight: 5,
					marginBottom: 10,
				}}
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
					<>
						<View className="my-5 w-full mt10">
							<SearchBar
								value={searchQuery}
								onChangeText={(text: string) => setSearchQuery(text)}
							/>
						</View>

						{moviesLoading && (
							<ActivityIndicator
								size={"large"}
								color={"#0000ff"}
								className="my-3"
							/>
						)}
						{moviesError && (
							<Text className="text-red-500 px-5 my-3">
								{moviesError?.message}
							</Text>
						)}

						{!moviesLoading && !moviesError && searchQuery.trim() && (
							<Text className="text-xl mb-4 text-white font-bold">
								Search Result For{" "}
								<Text className="text-accent">{searchQuery}</Text>
							</Text>
						)}
					</>
				}
			/>
		</View>
	);
};

export default search;
