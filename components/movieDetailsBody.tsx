import {
	View,
	Text,
	ScrollView,
	Image,
	Linking,
	TouchableOpacity,
} from "react-native";
import React from "react";
import ImageSwiper from "./imageSwiper";
import { AntDesign } from "@expo/vector-icons";
import { MovieDetails } from "@/interfaces/interfaces";

interface MovieInfoProps {
	label: string;
	value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
	return (
		<View className="flex-col items-start justify-center mt-5">
			<Text className="text-light-200 font-normal text-sm">{label}</Text>
			<Text className="text-light-100 font-bold text-sm mt-2">
				{value || "N/A"}
			</Text>
		</View>
	);
};

const MovieDetailsBody = ({ movie }: { movie: MovieDetails }) => {
	return (
		<ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
			<ImageSwiper movieId={movie.id} />

			<View className="flex-col items-start justify-center mt-5 px-5">
				<Text className="text-white font-bold text-xl">{movie?.title}</Text>

				<View className="flex-row items-center gap-x-2 mt-2">
					<Text className="text-light-200 text-sm">
						{movie?.release_date?.split("-")[0]}
					</Text>
					<Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
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

				{/* Extra Info */}
				<MovieInfo label="Original Title" value={movie?.original_title} />
				<View className="flex flex-row justify-between items-center w-1/2">
					<MovieInfo
						label="Original Language"
						value={
							movie?.spoken_languages?.find(
								(lang) => lang.iso_639_1 === movie.original_language
							)?.english_name ?? "N/A"
						}
					/>

					<MovieInfo label="Status" value={movie?.status} />
				</View>
				<MovieInfo
					label="Genres"
					value={
						movie?.genres?.length
							? movie.genres.map((g) => g.name).join(" - ")
							: "N/A"
					}
				/>

				<View className="flex flex-row justify-between w-1/2">
					<MovieInfo
						label="Budget"
						value={
							movie?.budget ? `$${movie?.budget / 1_000_000} millions` : "N/A"
						}
					/>
					<MovieInfo
						label="Revenue"
						value={
							movie?.revenue
								? `$${Math.round(movie?.revenue / 1_000_000)} millions`
								: "N/A"
						}
					/>
				</View>

				<MovieInfo label="Overview" value={movie?.overview} />

				<MovieInfo
					label="Spoken Languages"
					value={
						movie?.spoken_languages?.length
							? movie.spoken_languages
									.map((lang) => lang.english_name)
									.join(" / ")
							: "N/A"
					}
				/>
				<MovieInfo label="Tagline" value={movie?.tagline} />

				{/* Production Countries as Flags */}
				<MovieInfo
					label="Production Countries"
					value={
						movie?.production_countries?.length
							? movie.production_countries
									.map(
										(g) =>
											`${g.iso_3166_1
												.toUpperCase()
												.replace(/./g, (char) =>
													String.fromCodePoint(char.charCodeAt(0) + 127397)
												)} ${g.name}`
									)
									.join(" - ")
							: "N/A"
					}
				/>

				{/* Production Companies */}
				<View className="flex-col items-start justify-center mt-5">
					<Text className="text-light-200 font-normal text-sm mb-2">
						Production Companies
					</Text>
					{movie?.production_companies?.length > 0 ? (
						<View className="flex flex-wrap gap-3">
							{movie.production_companies.map((company) => (
								<View
									key={company.id}
									className="flex-row items-center bg-gray-400 rounded-lg px-3 py-2"
								>
									{company.logo_path && (
										<Image
											source={{
												uri: `https://image.tmdb.org/t/p/w200${company.logo_path}`,
											}}
											className="w-6 h-6 mr-2"
											resizeMode="contain"
										/>
									)}
									<Text className="text-stone-800 font-semibold text-sm">
										{company.name}
									</Text>
								</View>
							))}
						</View>
					) : (
						<Text className="text-light-100 font-bold text-sm">N/A</Text>
					)}
				</View>

				{/* Optional Homepage */}
				{movie?.homepage && (
					<TouchableOpacity
						className="bg-blue-500/90 mt-8 rounded-lg py-2 px-4 w-full"
						onPress={() => Linking.openURL(movie.homepage)}
					>
						<Text className="text-light-200 font-extrabold text-lg text-center">
							Visit Homepage
						</Text>
					</TouchableOpacity>
				)}
			</View>
		</ScrollView>
	);
};

export default MovieDetailsBody;
