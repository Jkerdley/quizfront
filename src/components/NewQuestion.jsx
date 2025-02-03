import { useState } from 'react';
import './styles/NewQuestion.css';
import axios from 'axios';
import { NewAnswerInput } from './NewAnswerInput';
import { AddNewAnswerButton } from './AddNewAnswerButton';

const URL = 'http://localhost:3005/';

export function NewQuestion({ onAddNewQuestion }) {
	const [title, setTitle] = useState('');
	const [answers, setAnswers] = useState([{ title: '', isTrueAnswer: false }]);

	const handleSave = async () => {
		const question = {
			title,
			answers: answers.map((answer) => ({
				title: answer.title,
				isTrueAnswer: answer.isTrueAnswer,
			})),
		};
		try {
			const response = await axios.post(URL, question);
			onAddNewQuestion(response.data);
			setTitle('');
			setAnswers([{ title: '', isTrueAnswer: false }]);
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
						key={index}
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
