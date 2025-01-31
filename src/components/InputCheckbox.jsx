import './styles/NewQuestion.css';
export const InputCheckbox = ({ answer, answers, setAnswers, index }) => {
	const handleAnswerCheckboxChange = (index) => {
		console.log('handle checked', index);
		const updatedAnswers = answers.map((answer, i) =>
			i === index ? { ...answer, isTrueAnswer: !answer.isTrueAnswer } : answer,
		);
		setAnswers(updatedAnswers); // Обновляем состояние
	};
	return (
		<input
			type="checkbox"
			className="new-question-item__checkbox"
			checked={answer?.isTrueAnswer || false}
			onChange={() => handleAnswerCheckboxChange(index)}
		/>
	);
};
