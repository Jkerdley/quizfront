import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuizAttempts } from '../utils/storage';
import './styles/ResultPage.css';

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
			<p className="results-page_answers-text-header">Результаты последней попытки:</p>
			{results.slice(-1).map((attempt) => (
				<div key={attempt.storyId}>
					<div className="results-page_answers-text">
						<p>
							Правильных ответов: {calculateScore(attempt)}/{attempt.answersStory.length}
						</p>
						<p>Дата: {attempt.answersDate}</p>
					</div>
				</div>
			))}
			<div className="resultpage-buttons-cointainer">
				<button
					className="question-item__button resultpage-tomainpage-button"
					onClick={() => navigate('/')}
				>
					На главную
				</button>
				<button
					className="question-item__button resultpage-repeattest-button"
					onClick={() => navigate('/quiz/0')}
				>
					Пройти тест повторно
				</button>
			</div>
		</div>
	);
};
