import {
	View,
	Text,
	TouchableOpacity,
	ActivityIndicator,
	StatusBar,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import useFetch from "@/hooks/useFetch";
import { fetchMovieDetails, fetchVideo } from "@/services/api";
import MovieDetailsBody from "@/components/movieDetailsBody";
import VideoTrailer from "@/components/videoTrailer";

const MovieDetails = () => {
	const { id } = useLocalSearchParams();
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const fetchMovie = useCallback(() => fetchMovieDetails(id as string), [id]);

	const { data: movie, loading, error } = useFetch(fetchMovie, true);

	const fetchVid = useCallback(() => fetchVideo(Number(id)), [id]);

	const { data: videos } = useFetch(fetchVid, true);

	return (
		<View className="bg-primary flex-1 justify-center items-center">
			<StatusBar hidden={true} />
			{loading ? (
				<ActivityIndicator
					size={"large"}
					color={"#0000ff"}
					className="mt-10 self-center"
				/>
			) : error ? (
				<Text className="text-xl font-bold text-red-500d">
					{error?.message}
				</Text>
			) : (
				movie && (
					<View className="relative">
						<MovieDetailsBody movie={movie} />
						<View className="absolute bottom-5 mx-4 gap-2 flex flex-row items-center justify-center z-50">
							<TouchableOpacity
								className="bg-accent rounded-lg py-3.5 gap-2 w-[50%]"
								onPress={router.back}
							>
								<Text className="text-white text-center font-semibold text-base ">
									Go Back
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								className={`${videos?.[0] ? "bg-red-500 " : "bg-red-500/50 "} rounded-lg py-3.5 w-[50%]`}
								onPress={() => setIsModalOpen(true)}
								disabled={!videos?.[0]}
							>
								<Text
									className={`${videos?.[0] ? "text-white " : "text-white/50 "} text-center font-semibold text-base`}
								>
									{videos?.[0] ? "Watch Trailer" : "No Trailer"}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				)
			)}
			{movie && videos?.[0] && (
				<VideoTrailer
					visible={isModalOpen}
					video={videos[0]}
					onClose={() => setIsModalOpen(false)}
				/>
			)}
		</View>
	);
};

export default MovieDetails;
