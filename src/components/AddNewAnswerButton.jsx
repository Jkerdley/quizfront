import './styles/AddNewAnswerButton.css';

// Компонент кнопки для добавления нового варианта ответа
export const AddNewAnswerButton = ({ setAnswers, answers }) => {
	const handleAddNewAnswer = () => {
		// Добавляем новый объект ответа с пустым заголовком и флагом false
		setAnswers([...answers, { title: '', isTrueAnswer: false }]);
	};
	return (
		<button className="new-question-item__button" onClick={handleAddNewAnswer}>
			+ Добавить вариант ответа
		</button>
	);
};
