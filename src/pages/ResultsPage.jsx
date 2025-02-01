import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuizAttempts } from '../utils/storage';

export const ResultsPage = () => {
	const navigate = useNavigate();
	const [results, setResults] = useState([]);

	useEffect(() => {
		const attempts = getQuizAttempts();
		console.log('Loaded attempts:', attempts);
		setResults(attempts);
	}, []);

	const calculateScore = (attempt) => {
		const correctAnswers = attempt.answersStory.filter((a) => a === true).length;
		const totalQuestions = attempt.answersStory.length;
		console.log('Score calculation:', correctAnswers, '/', totalQuestions);
		return correctAnswers;
	};

	return (
		<div className="results-page">
			<h2>Результаты последней попытки:</h2>
			{results.slice(-1).map((attempt) => (
				<div key={attempt.storyId}>
					<p>
						Правильных ответов: {calculateScore(attempt)}/{attempt.answersStory.length}
					</p>
					<p>Дата: {attempt.answersDate}</p>
				</div>
			))}
			<div className="results-buttons">
				<button onClick={() => navigate('/')}>На главную</button>
				<button onClick={() => navigate('/quiz/0')}>Пройти тест повторно</button>
			</div>
		</div>
	);
};
