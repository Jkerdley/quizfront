import './styles/AddNewAnswerButton.css';
export const AddNewAnswerButton = ({ setAnswers, answers }) => {
	const handleAddNewAnswer = () => {
		setAnswers([...answers, { title: '', isTrueAnswer: false }]); // Добавляем новый объект с пустым title
	};
	return (
		<button className="new-question-item__button" onClick={handleAddNewAnswer}>
			+ Добавить вариант ответа
		</button>
	);
};
