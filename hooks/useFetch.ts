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
			return result;
		} catch (error) {
			setError(error instanceof Error ? error : new Error("An Error Occurred"));
			return null;
		} finally {
			setLoading(false);
		}
	};

	const reset = () => {
		setLoading(false);
		setError(null);
		setData(null);
	};

	useEffect(() => {
		let isMounted = true;

		const autoFetchData = async () => {
			if (autoFetch) {
				try {
					setLoading(true);
					setError(null);
					const result = await fetchFunction();
					if (isMounted) setData(result);
				} catch (error) {
					if (isMounted)
						setError(
							error instanceof Error ? error : new Error("An Error Occurred")
						);
				} finally {
					if (isMounted) setLoading(false);
				}
			}
		};

		autoFetchData();

		return () => {
			isMounted = false;
		};
	}, [autoFetch, fetchFunction]);

	return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
