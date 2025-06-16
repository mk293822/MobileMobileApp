import { Stack } from "expo-router";
import "./global.css";

const RootLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="(tab)" options={{ headerShown: false }} />
			<Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
		</Stack>
	);
};
export default RootLayout;
