import { InputCheckbox } from './InputCheckbox';
import './styles/NewAnswerInput.css';
export const NewAnswerInput = ({ answer, answers, setAnswers, index }) => {
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
		<div key={answer._id} className="answers-items_indedit-container">
			<input
				name="answer"
				className="new-question-answer-item__input"
				type="text"
				required={true}
				placeholder="Введите вариант ответа"
				value={answer.title} // Используем title из объекта
				onChange={(e) => handleNewAnswerChange(index, e.target.value)}
			/>
			<InputCheckbox index={index} answers={answers} setAnswers={setAnswers} answer={answer} />
			<label>Ответ правильный?</label>
			<button
				className="new-question-item__remove-button"
				onClick={() => handleDeleteNewAnswer(index)} // Передаем индекс для удаления
			>
				Удалить
			</button>
		</div>
	);
};
