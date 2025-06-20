import { View, Image, FlatList, ActivityIndicator, Text } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { fetchImages } from "@/services/api";
import { ImageProps } from "@/interfaces/interfaces";

const ImageSwiper = ({ movieId }: { movieId: number }) => {
    const flatListRef = useRef<FlatList>(null);
    
    const fetchImg = useCallback(() => fetchImages(movieId), [movieId]);
    const [posters, setPosters] = useState<ImageProps[]>();

	const {
		data,
		loading,
		error,
    } = useFetch(fetchImg, true);

	useEffect(() => setPosters(data?.posters), [data]);

	return (
		<View className="flex justify-center items-center min-h-[550px]">
			{!posters || loading ? (
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
				<FlatList<ImageProps>
					ref={flatListRef}
					data={posters}
					renderItem={({ item }) => (
						<Image
							source={{
								uri: `https://image.tmdb.org/t/p/w500${item.file_path}`,
							}}
							className="w-screen h-[550px]"
							resizeMode="cover"
						/>
					)}
					horizontal
					pagingEnabled
					windowSize={5}
					initialNumToRender={3}
					maxToRenderPerBatch={3}
					removeClippedSubviews={true}
					updateCellsBatchingPeriod={50}
					keyExtractor={(__, index) => String(index)}
					showsHorizontalScrollIndicator={false}
				/>
			)}
		</View>
	);
};

export default ImageSwiper;
