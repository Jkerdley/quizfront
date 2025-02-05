import '../pages/styles/EditPage.css'; // Стили для страницы редактирования
import { NewQuestion, QuestionItem } from '../components'; // Компоненты для добавления и редактирования вопросов
import { Link } from 'react-router-dom';
import { fetchQuestions } from '../store/actions/quizActions'; // Экшен загрузки вопросов
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export function EditPage() {
	const dispatch = useDispatch();
	const { questions, error, loading } = useSelector((state) => state.quiz);

	// При монтировании компонента загружаем вопросы с сервера
	useEffect(() => {
		dispatch(fetchQuestions());
	}, [dispatch]);

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
		<div className="app">
			<Link to="/">
				<button className="question-item__button">Вернуться на главную</button>
			</Link>

			{/* Компонент для добавления нового вопроса */}
			<NewQuestion />

			<h1 className="app__title">Список вопросов</h1>
			<div className="app__list">
				{questions.map((question, index) => {
					const isDeleteDisabled = questions.length < 2;
					return (
						<QuestionItem
							key={question._id || index}
							question={question}
							isDisabled={isDeleteDisabled}
						/>
					);
				})}
			</div>
		</div>
	);
}
