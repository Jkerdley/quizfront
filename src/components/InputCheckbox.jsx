import './styles/NewQuestion.css';

// Компонент checkbox для обозначения, является ли вариант ответа правильным
export const InputCheckbox = ({ answer, answers, setAnswers, index }) => {
	// Обновляем флаг isTrueAnswer для конкретного варианта ответа
	const handleAnswerCheckboxChange = (index) => {
		const updatedAnswers = answers.map((answer, i) =>
			i === index ? { ...answer, isTrueAnswer: !answer.isTrueAnswer } : answer,
		);
		setAnswers(updatedAnswers);
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
