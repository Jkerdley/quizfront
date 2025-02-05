import { InputCheckbox } from './InputCheckbox';
import './styles/NewAnswerInput.css';

// Компонент для ввода варианта ответа в форме нового вопроса
export const NewAnswerInput = ({ answer, answers, setAnswers, index }) => {
	// Обработчик изменения текста ответа
	const handleNewAnswerChange = (index, value) => {
		const updatedAnswers = [...answers];
		updatedAnswers[index].title = value;
		setAnswers(updatedAnswers);
	};
	// Обработчик удаления варианта ответа
	const handleDeleteNewAnswer = (index) => {
		const updatedAnswers = answers.filter((_, i) => i !== index);
		setAnswers(updatedAnswers);
	};

	return (
		<div key={answer._id} className="answers-items_indedit-container">
			<input
				name="answer"
				className="new-question-answer-item__input"
				type="text"
				required
				pattern=".*\S+.*"
				placeholder="Введите вариант ответа"
				value={answer.title}
				onChange={(e) => handleNewAnswerChange(index, e.target.value)}
			/>
			{/* Компонент checkbox для обозначения правильности ответа */}
			<InputCheckbox index={index} answers={answers} setAnswers={setAnswers} answer={answer} />
			<label>Ответ правильный?</label>
			<button className="new-question-item__remove-button" onClick={() => handleDeleteNewAnswer(index)}>
				Удалить
			</button>
		</div>
	);
};
