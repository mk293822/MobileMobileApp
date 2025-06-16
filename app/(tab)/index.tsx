import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/searchBar";
import TrendingCard from "@/components/trendingCard";
import useFetch from "@/hooks/useFetch";
import { fetchMovie } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import { useRouter } from "expo-router";
import { FlatList, RefreshControl, ScrollView, Text, View } from "react-native";

const Index = () => {
	const router = useRouter();

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
	} = useFetch(() => fetchMovie({ query: "" }), true);

	return (
		<View className="flex-1 bg-primary items-center justify-center">
			<ScrollView
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={trendingLoading || moviesLoading}
						onRefresh={refetch}
					/>
				}
				contentContainerStyle={{
					minHeight: "100%",
					padding: 20,
				}}
			>
				{moviesError || trendingError ? (
					<Text>{moviesError?.message || trendingError?.message}</Text>
				) : (
					<View className="flex-1 mt-8 w-[90vw]">
						<SearchBar onPress={() => router.push("/search")} />

						{trendingMovies && (
							<View className="mt-10">
								<Text className="text-white font-bold text-lg mb-3">
									Trending Movies
								</Text>
							</View>
						)}

						<>
							<FlatList
								data={trendingMovies?.sort((a, b) => a.count - b.count)}
								renderItem={({ item, index }) => (
									<TrendingCard movie={item} index={index} />
								)}
								horizontal
								keyExtractor={(item) => item.movie_id.toString()}
								showsHorizontalScrollIndicator={false}
								ItemSeparatorComponent={() => <View className="w-4" />}
							/>
							<Text className="text-lg text-white font-bold mb-3 mt-6">
								Latest Movies
							</Text>

							<FlatList
								scrollEnabled={false}
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
								className="mt-2 pb-32"
								onEndReachedThreshold={0.5}
							/>
						</>
					</View>
				)}
			</ScrollView>
		</View>
	);
};

export default Index;
