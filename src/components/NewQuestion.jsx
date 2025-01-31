import { useState } from 'react';
import './styles/NewQuestion.css'; // Импортируем стили для NewQuestion
import axios from 'axios';

const URL = 'http://localhost:3005/';

export function NewQuestion({ onAddNewQuestion }) {
	const [title, setTitle] = useState(''); // Заголовок вопроса
	const [answers, setAnswers] = useState([{ title: '' }]); // Массив ответов, инициализируем с пустой строкой

	const handleSave = async () => {
		const question = {
			title,
			answers: answers.map((answer, index) => ({
				id: (index + 1).toString(),
				title: answer.title,
				isTrueAnswer: answer.isTrueAnswer, // По умолчанию устанавливаем false
			})),
		};
		try {
			const response = await axios.post(URL, question); // Отправляем POST запрос на сервер
			console.log('response.data', response.data);

			onAddNewQuestion(response.data);
			setTitle(''); // Сбрасываем заголовок
			setAnswers(['']); // Сбрасываем массив ответов
		} catch (error) {
			console.error('Ошибка при добавлении вопроса:', error);
		}
	};

	const handleAddNewAnswer = () => {
		setAnswers([...answers, { title: '' }]); // Добавляем пустую строку для нового ответа
	};

	const handleNewAnswerChange = (index, value) => {
		const updatedAnswers = [...answers];
		console.log('updated answers', updatedAnswers);
		updatedAnswers[index].title = value; // Обновляем текст ответа по индексу
		setAnswers(updatedAnswers);
	};

	const handleDeleteNewAnswer = (index) => {
		const updatedAnswers = answers.filter((_, i) => i !== index); // Удаляем ответ по индексу
		setAnswers(updatedAnswers);
	};

	const handleAnswerCheckboxChange = (index) => {
		const updatedAnswers = answers.map((answer, i) => ({
			title: answer.title, // Сохраняем текущее значение title
			isTrueAnswer: i === index, // Устанавливаем true для выбранного ответа
		}));
		setAnswers(updatedAnswers); // Обновляем состояние
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
							placeholder="Введите ответ"
							value={answer.title} // Используем title из объекта
							onChange={(e) => handleNewAnswerChange(index, e.target.value)}
						/>
						<input
							type="checkbox"
							className="new-question-item__checkbox"
							onChange={() => handleAnswerCheckboxChange(index)}
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
