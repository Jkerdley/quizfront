import { useState } from 'react';
import './styles/NewQuestion.css';
import { NewAnswerInput } from './NewAnswerInput';
import { AddNewAnswerButton } from './AddNewAnswerButton';
import { useDispatch } from 'react-redux';
import { addQuestion } from '../store/actions/quizActions';

export function NewQuestion() {
	const dispatch = useDispatch();
	const [title, setTitle] = useState(''); // Локальное состояние для текста вопроса
	// Инициализация состояния с одним пустым вариантом ответа
	const [answers, setAnswers] = useState([{ title: '', isTrueAnswer: false }]);

	// Обработчик сохранения нового вопроса
	const handleSave = async () => {
		const question = {
			title,
			answers: answers.map((answer) => ({
				title: answer.title,
				isTrueAnswer: answer.isTrueAnswer,
			})),
		};
		dispatch(addQuestion(question)); // Диспатчим экшен добавления вопроса
		// Очистка полей после сохранения
		setTitle('');
		setAnswers([{ title: '', isTrueAnswer: false }]);
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
						key={index} // Индекс используется в качестве ключа, так как new answer пока не имеет _id
						index={index}
						answer={answer}
						answers={answers}
						setAnswers={setAnswers}
					/>
				))}
				{/* Кнопка для добавления нового варианта ответа */}
				<AddNewAnswerButton setAnswers={setAnswers} answers={answers} />
			</div>
		</div>
	);
}
