import React from "react";
import { Stack } from "expo-router";
import "./global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";

const RootLayout = () => {
	return (
		<SafeAreaProvider>
			<Stack>
				<Stack.Screen name="(tab)" options={{ headerShown: false }} />
				<Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
			</Stack>
		</SafeAreaProvider>
	);
};
export default RootLayout;
