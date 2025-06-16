import { getDefaultConfig } from "expo/metro-config";
import { withNativeWind } from "nativewind/metro";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const config = getDefaultConfig(__dirname);

export default withNativeWind(config, { input: "./app/global.css" });
