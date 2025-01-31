import { useState } from 'react';
import './styles/NewQuestion.css';
import axios from 'axios';
import { InputCheckbox } from './InputCheckbox';

const URL = 'http://localhost:3005/';

export function NewQuestion({ onAddNewQuestion }) {
	const [title, setTitle] = useState(''); // Заголовок вопроса
	const [answers, setAnswers] = useState([{ title: '', isTrueAnswer: false }]); // Инициализируем с пустым объектом

	const handleSave = async () => {
		const question = {
			title,
			answers: answers.map((answer) => ({
				title: answer.title,
				isTrueAnswer: answer.isTrueAnswer, // Устанавливаем значение isTrueAnswer
			})),
		};
		try {
			const response = await axios.post(URL, question); // Отправляем POST запрос на сервер
			onAddNewQuestion(response.data); // Вызываем функцию для обновления списка вопросов
			setTitle(''); // Сбрасываем заголовок
			setAnswers([{ title: '', isTrueAnswer: false }]); // Сбрасываем массив ответов
		} catch (error) {
			console.error('Ошибка при добавлении вопроса:', error);
		}
	};

	const handleAddNewAnswer = () => {
		setAnswers([...answers, { title: '', isTrueAnswer: false }]); // Добавляем новый объект с пустым title
	};

	const handleNewAnswerChange = (index, value) => {
		const updatedAnswers = [...answers];
		updatedAnswers[index].title = value; // Обновляем title в объекте по индексу
		setAnswers(updatedAnswers);
	};

	const handleDeleteNewAnswer = (index) => {
		const updatedAnswers = answers.filter((_, i) => i !== index); // Удаляем ответ по индексу
		setAnswers(updatedAnswers);
	};

	return (
		<div className="new-question-item">
			<div className="new-question-item__input_title_container">
				<input
					name="question"
					className="new-question-item__input"
					type="text"
					placeholder="Введите вопрос"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<button className="new-question-item__button" onClick={handleSave}>
					Добавить вопрос
				</button>
			</div>
			<div className="new-question-item__answers-container">
				{answers.map((answer, index) => (
					<div key={index} className="new-question-item__answer-and-removebutton">
						<input
							name="answer"
							className="new-question-answer-item__input"
							type="text"
							placeholder="Введите вариант ответа"
							value={answer.title} // Используем title из объекта
							onChange={(e) => handleNewAnswerChange(index, e.target.value)}
						/>
						<InputCheckbox
							index={index}
							answers={answers}
							setAnswers={setAnswers}
							answer={answer}
						/>
						<label>Ответ правильный?</label>
						<button
							className="new-question-item__remove-button"
							onClick={() => handleDeleteNewAnswer(index)} // Передаем индекс для удаления
						>
							Удалить
						</button>
					</div>
				))}
				<button className="new-question-item__button" onClick={handleAddNewAnswer}>
					+ Добавить вариант ответа
				</button>
			</div>
		</div>
	);
}
