import { useState, useEffect } from 'react';
import axios from 'axios';
import { QuestionItem } from './components/QuestionItem';
import './App.css'; // Импортируем стили для App
import { NewQuestion } from './components/NewQuestion';

const URL = 'http://localhost:3005/';

function App() {
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Функция для добавления нового вопроса
	const handleAddNewQuestion = (newQuestions) => {
		setQuestions(() => [...newQuestions]);
	};

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

	if (loading) return <h3>Загрузка...</h3>;
	if (error) return <h3>Ошибка: {error}</h3>;

	return (
		<div className="app">
			<NewQuestion onAddNewQuestion={handleAddNewQuestion} />
			{/* Передаем функцию для добавления вопроса */}
			<h1 className="app__title">Список вопросов</h1>
			<div className="app__list">
				{questions.map((question) => (
					<QuestionItem
						questions={questions}
						key={question._id}
						question={question}
						onRemove={handleRemoveQuestion}
						onEdit={handleEditQuestion}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
