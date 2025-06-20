import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	Text,
	View,
} from "react-native";
import React, { useCallback } from "react";
import HomePageHeader from "./homePageHeader";
import MovieCard from "./movieCard";
import { MovieDetails, TrendingMovie } from "@/interfaces/interfaces";

interface HomePageBodyProps {
	renderTrendingMovies: TrendingMovie[] | null | undefined;
	renderMovies: MovieDetails[];
	refreshing: boolean;
	onRefresh: () => void;
	loadMore: boolean;
	hasMore: boolean;
	handleMovieEndReached: () => void;
}

const HomePageMovieBody = ({
	renderTrendingMovies,
	renderMovies,
	refreshing,
	onRefresh,
	loadMore,
	hasMore,
	handleMovieEndReached,
}: HomePageBodyProps) => {
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
				<View className="my-8">
					<Text className="text-white font-bold text-xl">No More Movies</Text>
				</View>
			);
		}
	}, [loadMore, hasMore]);

	return (
		<View className="flex-1 w-[90vw]">
			<FlatList
				ListHeaderComponent={
					<HomePageHeader renderTrendingMovies={renderTrendingMovies} />
				}
				refreshControl={
					<RefreshControl
						progressBackgroundColor={"transparent"}
						colors={["#0000ff"]}
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
				data={renderMovies}
				renderItem={renderMovieCards}
				keyExtractor={(item) => item.id.toString()}
				onEndReached={() => {
					if (!loadMore && hasMore) handleMovieEndReached();
				}}
				ListFooterComponent={footerComponents}
				windowSize={5}
				initialNumToRender={12}
				maxToRenderPerBatch={12}
				removeClippedSubviews={true}
				updateCellsBatchingPeriod={100}
				numColumns={3}
				columnWrapperStyle={{
					justifyContent: "flex-start",
					gap: 20,
					paddingRight: 5,
					marginBottom: 10,
				}}
				className="pt-8 pb-28"
				onEndReachedThreshold={0.5}
			/>
		</View>
	);
};

export default HomePageMovieBody;
