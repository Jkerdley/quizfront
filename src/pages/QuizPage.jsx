import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { saveQuizAttempt } from '../utils';
import { QuestionWithAnswersComponent, LinkButton } from '../components';
import { useFetchQuestions } from '../hooks/useFetchQuestions';
import './styles/QuizPage.css';

export const QuizPage = () => {
	const { questionId } = useParams();
	const navigate = useNavigate();
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [questions, setQuestions] = useState([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [userAnswers, setUserAnswers] = useState({});
	const [selectedAnswersMap, setSelectedAnswersMap] = useState({});

	console.log('Current answers state:', userAnswers);
	console.log('Selected answers map:', selectedAnswersMap);

	useFetchQuestions(setQuestions, setError, setLoading);

	useEffect(() => {
		if (questions.length > 0) {
			const index = questions.findIndex((question) => question._id === questionId);
			setCurrentQuestionIndex(index !== -1 ? index : 0);
		}
	}, [questionId, questions]);

	const handleAnswer = (questionId, isCorrect, selectedAnswers) => {
		console.log('Question answered:', questionId, 'isCorrect:', isCorrect, 'selected:', selectedAnswers);

		setUserAnswers((prev) => ({
			...prev,
			[questionId]: isCorrect,
		}));

		setSelectedAnswersMap((prev) => ({
			...prev,
			[questionId]: selectedAnswers,
		}));
	};

	const handleFinishQuiz = () => {
		const answersArray = questions.map((question) => {
			const answer = userAnswers[question._id];
			return answer === undefined ? null : answer;
		});

		console.log('Final answers array:', answersArray);

		const attempt = {
			storyId: Date.now(),
			answersStory: answersArray,
			answersDate: new Date().toLocaleDateString(),
		};

		console.log('Saving attempt:', attempt);
		saveQuizAttempt(attempt);
		navigate('/quiz/results');
	};

	if (loading)
		return (
			<div className="edit-page__loader-container">
				<h3>Загрузка...</h3>
			</div>
		);
	if (error)
		return (
			<div className="edit-page__loader-container">
				<h3>Ошибка: {error}</h3>
			</div>
		);

	return (
		<div className="quiz-cointainer">
			<QuestionWithAnswersComponent
				question={questions[currentQuestionIndex]}
				onAnswer={(isCorrect, selectedAnswers) =>
					handleAnswer(questions[currentQuestionIndex]._id, isCorrect, selectedAnswers)
				}
				initialSelectedAnswers={selectedAnswersMap[questions[currentQuestionIndex]._id] || []}
			/>
			<div className="quiz-buttons-cointainer">
				<button
					className="question-item__button mainpage-edit-button"
					onClick={() => navigate(`/quiz/${questions[currentQuestionIndex - 1]._id}`)}
					disabled={currentQuestionIndex === 0}
				>
					Предыдущий вопрос
				</button>
				{currentQuestionIndex === questions.length - 1 ? (
					<button
						className="question-item__button mainpage-begin-button"
						onClick={handleFinishQuiz}
					>
						Завершить тестирование
					</button>
				) : (
					<button
						className="question-item__button mainpage-begin-button"
						onClick={() => navigate(`/quiz/${questions[currentQuestionIndex + 1]._id}`)}
					>
						Следующий вопрос
					</button>
				)}
			</div>
			<LinkButton to={'/'} className={'question-item__button'}>
				На главную страницу
			</LinkButton>
		</div>
	);
};
