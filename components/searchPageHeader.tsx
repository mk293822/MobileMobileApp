import React  from 'react'
import { View , Text, ActivityIndicator } from 'react-native'
import SearchBar from './searchBar';
import { SearchPageHeaderProps } from '@/interfaces/interfaces';


const SearchPageHeader = ({ searchQuery, setSearchQuery, moviesError, moviesLoading }: SearchPageHeaderProps) => {
  return (
		<>
			<View className="my-5 w-full mt10">
				<SearchBar
					value={searchQuery}
					autoFocus={true}
					onChangeText={(text: string) => setSearchQuery(text)}
				/>
			</View>

			{moviesLoading && (
				<ActivityIndicator size={"large"} color={"#0000ff"} className="my-3" />
			)}
			{moviesError && (
				<Text className="text-red-500 px-5 my-3">{moviesError?.message}</Text>
			)}

			{!moviesLoading && !moviesError && searchQuery.trim() && (
				<Text className="text-xl mb-4 text-white font-bold">
					Search Result For <Text className="text-accent">{searchQuery}</Text>
				</Text>
			)}
		</>
	);
}

export default SearchPageHeader