import { View, TextInput } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'

interface Search {
	onPress?: () => void;
	value?: string;
	onChangeText?: (text: string) => void;
	autoFocus?: boolean;
}

const SearchBar = ({
	onPress,
	value,
	onChangeText,
	autoFocus = false,
}: Search) => {
	return (
		<View className="flex-row gap-2 items-center px-5 bg-dark-100 py-1 rounded-full">
			<AntDesign name="search1" color={"white"} size={18} />
			<TextInput
				onPress={onPress}
				placeholder="Search for a movie....."
				value={value}
				onChangeText={onChangeText}
				placeholderTextColor={"#a8b5db"}
				className="flex-1 text-white"
				autoFocus={autoFocus}
			/>
		</View>
	);
};

export default SearchBar