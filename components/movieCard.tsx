import { Text, TouchableOpacity, Image, View } from 'react-native'
import React, { useCallback } from "react";
import { MovieDetails } from "@/interfaces/interfaces";
import { Link } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { updateTrendingMovies } from "@/services/appwrite";

const MovieCard = React.memo(
	({ id, poster_path, title, vote_average, release_date }: MovieDetails) => {
		const handlePress = useCallback(() => {
			updateTrendingMovies({ id, title, poster_path });
		}, [id, title, poster_path]);

		return (
			<Link onPress={handlePress} href={`/movies/${id}`} asChild>
				<TouchableOpacity className="w-[30%]">
					<Image
						source={{
							uri: poster_path
								? `https://image.tmdb.org/t/p/w500${poster_path}`
								: "https://placeholder.com/600×400/1a1a1a/ffffff.png",
						}}
						resizeMode="cover"
						className="w-full h-52 rounded-lg"
					/>
					<Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
						{title}
					</Text>

					<View className="flex-row items-center justify-start gap-x-1">
						<AntDesign name="star" size={12} color={"yellow"} />
						<Text className="text-white text-xs font-bold">
							{vote_average ? Math.round(vote_average / 2) : 0}
						</Text>
					</View>
					<View className="flex-row justify-between items-center">
						<Text className="text-xs text-light-100 font-medium mt-1">
							{release_date ? release_date.split("-")[0] : "N/A"}
						</Text>
					</View>
				</TouchableOpacity>
			</Link>
		);
	}
);

MovieCard.displayName = "MovieCard";

export default MovieCard