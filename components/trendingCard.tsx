import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { TrendingCardInterface } from '@/interfaces/interfaces';
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";

const TrendingCard = ({
	movie: { movie_id, title, poster_url },
	index,
}: TrendingCardInterface) => {
	return (
		<Link href={`/movies/${movie_id}`} asChild>
			<TouchableOpacity className="w-32 relative pl-2">
				<Image
					source={{
						uri: poster_url
							? poster_url
							: "https://placeholder.com/600×400/1a1a1a/ffffff.png",
					}}
					resizeMode="cover"
					className="w-32 h-48 rounded-lg"
				/>

				<View className="absolute bottom-0 -left-4 px-2 py-1 rounded-full">
					<MaskedView
						maskElement={
							<Text className="font-bold text-white text-6xl">{index + 1}</Text>
						}
					>
						<Image
							source={require("../assets/images/icon.png")}
							className="size-20"
							resizeMode="cover"
						/>
					</MaskedView>
				</View>
				<Text
					className="text-sm font-bold text-light-200 mt-2"
					numberOfLines={1}
				>
					{title}
				</Text>
			</TouchableOpacity>
		</Link>
	);
};

export default TrendingCard;