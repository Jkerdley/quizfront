// import axios from 'axios';
// import { useEffect } from 'react';

// const URL = 'http://localhost:3005/';

// export const useFetchQuestions = (setQuestions, setError, setLoading) => {
// 	useEffect(() => {
// 		const fetchQuestions = async () => {
// 			try {
// 				const response = await axios.get(URL);
// 				setQuestions(response.data.questions);
// 			} catch (error) {
// 				setError(error.message);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};
// 		fetchQuestions();
// 	}, []);
// };

import axios from 'axios';
import { useEffect, useCallback, useState } from 'react';

const URL = 'http://localhost:3005/';

export const useFetchQuestions = () => {
	// Возвращаем состояния вместо их принятия как параметры
	const [questions, setQuestions] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	// Используем useCallback для мемоизации функции
	const fetchQuestions = useCallback(async () => {
		try {
			const response = await axios.get(URL);
			setQuestions(response.data.questions);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}, []); // Зависимости пустые, так как URL константа

	useEffect(() => {
		fetchQuestions();
	}, [fetchQuestions]);

	return { questions, error, loading, setQuestions };
};
