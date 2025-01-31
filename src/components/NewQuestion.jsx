import { useState } from 'react';
import './styles/NewQuestion.css';
import axios from 'axios';
import { NewAnswerInput } from './NewAnswerInput';
import { AddNewAnswerButton } from './AddNewAnswerButton';

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

	return (
		<div className="new-question-item">
			<div className="new-question-item__input_title_container">
				<input
					name="question"
					className="new-question-item__input"
					type="text"
					required
					pattern=".*\S+.*"
					placeholder="Введите новый вопрос"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<button className="new-question-item__button" onClick={handleSave}>
					Добавить вопрос
				</button>
			</div>
			<div className="new-question-item__answers-container">
				{answers.map((answer, index) => (
					<NewAnswerInput
						key={answer._id}
						index={index}
						answer={answer}
						answers={answers}
						setAnswers={setAnswers}
					/>
				))}
				<AddNewAnswerButton setAnswers={setAnswers} answers={answers} />
			</div>
		</div>
	);
}
