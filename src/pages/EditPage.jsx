import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../pages/styles/EditPage.css';
import { NewQuestion, QuestionItem } from '../components';
import { Link } from 'react-router-dom';
import { useFetchQuestions } from '../hooks/useFetchQuestions';

const URL = 'http://localhost:3005/';

export function EditPage() {
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useFetchQuestions(setQuestions, setError, setLoading);

	// Функция для добавления нового вопроса
	const handleAddNewQuestion = useCallback((newQuestions) => {
		setQuestions(() => [...newQuestions]);
	}, []);

	const handleRemoveQuestion = async (id) => {
		try {
			await axios.delete(`http://localhost:3005/${id}`);
			setQuestions(questions.filter((question) => question._id !== id));
		} catch (error) {
			console.error('Ошибка при удалении вопроса:', error);
		}
	};

	const handleEditQuestion = async (id, newTitle, newAnswers) => {
		await axios.put(`${URL}${id}`, { title: newTitle, answers: newAnswers });
		setQuestions(
			questions.map((question) =>
				question._id === id ? { ...question, title: newTitle, answers: newAnswers } : question,
			),
		);
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
		<div className="app">
			<Link to="/">
				<button className="question-item__button">Вернуться на главную</button>
			</Link>
			<NewQuestion onAddNewQuestion={handleAddNewQuestion} />
			{/* Передаем функцию для добавления вопроса */}
			<h1 className="app__title">Список вопросов</h1>
			<div className="app__list">
				{questions.map((question) => {
					let isDeleteDisabled = questions.length < 2 ? true : false;
					return (
						<QuestionItem
							key={question._id}
							question={question}
							onRemove={handleRemoveQuestion}
							onEdit={handleEditQuestion}
							isDisabled={isDeleteDisabled}
						/>
					);
				})}
			</div>
		</div>
	);
}
