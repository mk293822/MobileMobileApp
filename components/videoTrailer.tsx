import React from "react";
import { Modal, View, TouchableOpacity, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const VideoTrailer = ({
	visible,
	onClose,
	video,
}: {
	visible: boolean;
	onClose: () => void;
		video: { key: string; };
}) => {

	return (
		<Modal animationType="fade" transparent={true} visible={visible}>
			<View className="flex-1 bg-black/90 justify-center items-center relative">
				<View
					style={{ width: width, height: height / 3 }}
					className="bg-black rounded-xl overflow-hidden"
				>
					<WebView
						source={{ uri: `https://www.youtube.com/embed/${video.key}` }}
						style={{ flex: 1 }}
						allowsFullscreenVideo
					/>
				</View>

				<TouchableOpacity onPress={onClose} className="mt-4 absolute top-4 right-4">
					<Ionicons name="close-circle" size={40} color="#fff" />
				</TouchableOpacity>
			</View>
		</Modal>
	);
};

export default VideoTrailer;
