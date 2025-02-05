import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ResultPage.css'; // Стили для страницы результатов
import { useSelector, useDispatch } from 'react-redux';
import { loadQuizHistory } from '../store/actions/historyActions'; // Экшен загрузки истории

export const ResultsPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// Извлекаем историю попыток из Redux‑store
	const { attempts } = useSelector((state) => state.history);

	// Загружаем историю из localStorage при монтировании компонента
	useEffect(() => {
		dispatch(loadQuizHistory());
	}, [dispatch]);

	// Функция для расчёта результата теста
	const calculateScore = (attempt) => {
		const correctAnswers = attempt.answersStory.filter((a) => a === true).length;
		const totalQuestions = attempt.answersStory.length;
		console.log('Score calculation:', correctAnswers, '/', totalQuestions);
		return correctAnswers;
	};

	return (
		<div className="results-page">
			<p className="results-page_answers-text-header">Результаты последней попытки:</p>
			{attempts.slice(-1).map((attempt) => (
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
