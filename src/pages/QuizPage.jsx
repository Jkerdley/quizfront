import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QuestionWithAnswersComponent, LinkButton } from '../components'; // Компоненты для рендера вопроса и кнопки-ссылки
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestions } from '../store/actions/quizActions'; // Экшен загрузки вопросов
import { saveAttempt } from '../store/actions/historyActions'; // Экшен сохранения попытки
import './styles/QuizPage.css';

export const QuizPage = () => {
	const { questionId } = useParams(); // Получаем id вопроса из URL-параметров
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Извлекаем вопросы и состояние загрузки из Redux‑store
	const { questions, loading, error } = useSelector((state) => state.quiz);
	console.log('questions', questions);

	// Локальное состояние для индекса текущего вопроса, ответа пользователя и выбранных ответов
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [userAnswers, setUserAnswers] = useState({}); // Объект с id вопроса и ответом (true/false)
	const [selectedAnswersMap, setSelectedAnswersMap] = useState({}); // Выбранные ответы для каждого вопроса

	//TODO: удалить лишний useEffect и разобраться с двойным рендерингом

	// При первой загрузке, если вопросов нет, загружаем их
	// useEffect(() => {
	// 	if (questions.length === 0) {
	// 		dispatch(fetchQuestions());
	// 	}
	// }, [dispatch, questions.length]);

	// Если вопросы загружены, находим индекс вопроса по _id (в URL) и устанавливаем local state
	useEffect(() => {
		if (questions.length === 0) {
			dispatch(fetchQuestions());
		}
		if (questions.length > 0) {
			const index = questions.findIndex((question) => question._id === questionId);
			setCurrentQuestionIndex(index !== -1 ? index : 0);
		}
	}, [questionId]);

	// Функция обработки ответа на вопрос
	const handleAnswer = (questionId, isCorrect, selectedAnswers) => {
		setUserAnswers((prev) => ({
			...prev,
			[questionId]: isCorrect,
		}));
		setSelectedAnswersMap((prev) => ({
			...prev,
			[questionId]: selectedAnswers,
		}));
	};

	// При завершении теста подготавливаем объект попытки и сохраняем его в историю
	const handleFinishQuiz = () => {
		const answersArray = questions.map((question) => {
			const answer = userAnswers[question._id];
			return answer === undefined ? null : answer;
		});

		const attempt = {
			storyId: Date.now(), // Временная метка для уникального идентификатора попытки
			answersStory: answersArray,
			answersDate: new Date().toLocaleDateString(),
		};

		dispatch(saveAttempt(attempt));
		navigate('/quiz/results');
	};

	if (loading || questions.length === 0)
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
			{/* Компонент, который отображает текущий вопрос и варианты ответов */}
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
					onClick={() =>
						navigate(
							`/quiz/${questions[currentQuestionIndex - 1]?._id || questions[currentQuestionIndex]._id}`,
						)
					}
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
