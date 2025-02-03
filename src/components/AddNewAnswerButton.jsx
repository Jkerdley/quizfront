import './styles/AddNewAnswerButton.css';
export const AddNewAnswerButton = ({ setAnswers, answers }) => {
	const handleAddNewAnswer = () => {
		setAnswers([...answers, { title: '', isTrueAnswer: false }]);
	};
	return (
		<button className="new-question-item__button" onClick={handleAddNewAnswer}>
			+ Добавить вариант ответа
		</button>
	);
};
