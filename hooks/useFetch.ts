import { useState, useEffect } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch: boolean) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchData = async () => {
		try {
			setLoading(true);
			setError(null);
			
			const result = await fetchFunction();

			setData(result);
		} catch (error) {
			setError(error instanceof Error ? error : new Error('An Error Occur'));
		} finally {
			setLoading(false);
		}
	}

	const reset = () => {
		setLoading(false);
		setError(null);
		setData(null);
	}

	useEffect(() => {
		if (autoFetch) {
			fetchData();
		}
	}, []);

	return { data, loading, error, refetch: fetchData, reset };
}

export default useFetch;