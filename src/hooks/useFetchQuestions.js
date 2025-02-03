import axios from 'axios';
import { useEffect, useCallback, useState } from 'react';

const URL = 'http://localhost:3005/';

export const useFetchQuestions = () => {
	const [questions, setQuestions] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	const fetchQuestions = useCallback(async () => {
		try {
			const response = await axios.get(URL);
			setQuestions(response.data.questions);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchQuestions();
	}, [fetchQuestions]);

	return { questions, error, loading, setQuestions };
};
