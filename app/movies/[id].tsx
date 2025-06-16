import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import useFetch from '@/hooks/useFetch';
import { fetchMovieDetails } from '@/services/api';
import AntDesign from '@expo/vector-icons/AntDesign';

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return <View className='flex-col items-start justify-center mt-5'>
    <Text className='text-light-200 font-normal text-sm'>
      {label}
    </Text>
    <Text className='text-light-100 font-bold text-sm mt-2'>{value || 'N/A'}</Text>
  </View>
}

const MovieDetails = () => {

  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data: movie, loading, error } = useFetch(() => fetchMovieDetails(id as string), true);

  return (
		<View className="bg-primary flex-1">
			{loading ? (
				<ActivityIndicator
					size={"large"}
					color={"#0000ff"}
					className="mt-10 self-center"
				/>
			) : error ? (
				<Text className='text-xl font-bold text-red-500d'>{error?.message}</Text>
			) : (
				<>
					<ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
						<View>
							<Image
								source={{
									uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
								}}
								className="w-full h-[550px]"
								resizeMode="stretch"
							/>
						</View>
						<View className="flex-col items-start justify-center mt-5 px-5">
							<Text className="text-white font-bold text-xl">
								{movie?.title}
							</Text>
							<View className="flex-row items-center gap-x-1 mt-2">
								<Text className="text-light-200 text-sm">
									{movie?.release_date?.split("-")[0]}
								</Text>
								<Text className="text-light-200 text-sm">
									{movie?.runtime}m
								</Text>
							</View>

							<View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
								<AntDesign name="star" size={12} color={"yellow"} />
								<Text className="text-white font-bold text-sm">
									{Math.round(movie?.vote_average ?? 0)} / 10
								</Text>
								<Text className="text-light-200 text-sm">
									({movie?.vote_count} votes)
								</Text>
							</View>

							<MovieInfo label="Overview" value={movie?.overview} />
							<MovieInfo
								label="Genres"
								value={
									movie?.genres && movie.genres.length > 0
										? movie.genres.map((g) => g.name).join(" - ")
										: "N/A"
								}
							/>
							<View className="flex flex-row justify-between w-1/2">
								<MovieInfo
									label="Budget"
									value={
										movie?.budget
											? `$${movie?.budget / 1_000_000} millions`
											: "N/A"
									}
								/>
								<MovieInfo
									label="Revenue"
									value={
										movie?.revenue
											? `$${Math.round(movie?.revenue / 1_000_000)}`
											: "N/A"
									}
								/>
							</View>
							<MovieInfo
								label="Genres"
								value={
									movie?.production_companies &&
									movie.production_companies.length > 0
										? movie.production_companies.map((g) => g.name).join(" - ")
										: "N/A"
								}
							/>
						</View>
					</ScrollView>

					<TouchableOpacity
						className="absolute bottom-5 gap-2 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
						onPress={router.back}
					>
						<AntDesign
							size={22}
							name="arrowleft"
							className="mt-0.5"
							color={"white"}
						/>
						<Text className="text-white font-semibold text-base">Go Back</Text>
					</TouchableOpacity>
				</>
			)}
		</View>
	);
}

export default MovieDetails