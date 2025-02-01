import axios from 'axios';
import { useEffect } from 'react';

const URL = 'http://localhost:3005/';

export const useFetchQuestions = (setQuestions, setError, setLoading) => {
	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const response = await axios.get(URL);
				setQuestions(response.data.questions);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};
		fetchQuestions();
	}, []);
};
