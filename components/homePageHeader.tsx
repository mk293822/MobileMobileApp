import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { TrendingMovie } from '@/interfaces/interfaces';
import TrendingCard from './trendingCard';
import SearchBar from './searchBar';

const HomePageHeader = ({
	renderTrendingMovies,
}: {
	renderTrendingMovies: TrendingMovie[] | null | undefined;
}) => {
	const router = useRouter();

	return (
		<>
			<SearchBar onPress={() => router.navigate("/search")} />

			{renderTrendingMovies && renderTrendingMovies.length > 0 && (
				<View className="mt-4">
					<Text className="text-white font-extrabold text-lg mb-3">
						Trending Movies
					</Text>
				</View>
			)}
			<FlatList
				data={renderTrendingMovies?.sort((a, b) => b.count - a.count)}
				renderItem={({ item, index }) => (
					<TrendingCard movie={item} index={Number(index)} />
				)}
				horizontal
				keyExtractor={(item, index) => `${item.movie_id}-${index}`}
				showsHorizontalScrollIndicator={false}
				ItemSeparatorComponent={() => <View className="w-4" />}
			/>

			<Text className="text-lg text-white font-extrabold mb-3 mt-6">
				Latest Movies
			</Text>
		</>
	);
};

export default HomePageHeader
