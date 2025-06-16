import { View, Text } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

const saved = () => {
  return (
		<View className="flex-1 bg-primary px-10">
			<View className="flex justify-center items-center flex-1 flex-col gap-5">
				<AntDesign name="save" size={28} color={"white"} />
				<Text className="text-gray-500 text-base">Profile</Text>
			</View>
		</View>
	);
}

export default saved