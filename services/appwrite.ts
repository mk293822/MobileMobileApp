import { TrendingMovie } from "@/interfaces/interfaces";
import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;

const client = new Client()
	.setEndpoint("https://cloud.appwrite.io/v1")
	.setProject(PROJECT_ID);

const database = new Databases(client);

export const updateTrendingMovies = async ({
	title,
	id,
	poster_path,
}: {
	title: string;
	id: number;
	poster_path: string | null;
}) => {
	try {
		const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
			Query.equal("movie_id", id),
		]);
		if (result.documents.length > 0) {
			const existingMovie = result.documents[0];

			await database.updateDocument(
				DATABASE_ID,
				COLLECTION_ID,
				existingMovie.$id,
				{
					count: existingMovie.count + 1,
				}
			);
		} else {
			await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
				movie_id: id,
				count: 1,
				poster_url: `https://image.tmdb.org/t/p/w500${poster_path}`,
				title: title,
			});
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getTrendingMovies = async (): Promise<
	TrendingMovie[] | undefined
> => {
	try {
		const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
			Query.limit(10),
			Query.orderDesc("count"),
		]);

		return result.documents as unknown as TrendingMovie[];
	} catch (error) {
		console.log(error);
		return undefined;
	}
};
