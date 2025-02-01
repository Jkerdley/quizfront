import '../components/styles/QuestionWithAnswersComponent.css';
import { useEffect, useState } from 'react';
export const QuestionWithAnswersComponent = ({ question, onAnswer, initialSelectedAnswers = [] }) => {
	const [selectedAnswers, setSelectedAnswers] = useState(initialSelectedAnswers);

	useEffect(() => {
		setSelectedAnswers(initialSelectedAnswers);
	}, [question?._id, initialSelectedAnswers]);

	console.log('Current question:', question?._id, 'Selected answers:', selectedAnswers);

	const handleCheck = (answerId, isChecked) => {
		console.log('Checkbox changed:', answerId, isChecked);

		const newSelected = isChecked
			? [...selectedAnswers, answerId]
			: selectedAnswers.filter((id) => id !== answerId);

		console.log('New selected answers:', newSelected);
		setSelectedAnswers(newSelected);

		if (newSelected.length > 0) {
			const correctAnswers = question.answers.filter((a) => a.isTrueAnswer).map((a) => a._id);

			console.log('Correct answers:', correctAnswers);

			const arraysEqual = (a, b) =>
				a.length === b.length && [...a].sort().every((val, idx) => val === [...b].sort()[idx]);

			const isCorrect = arraysEqual(newSelected, correctAnswers);
			console.log('Is answer correct:', isCorrect);
			onAnswer(isCorrect, newSelected);
		} else {
			console.log('No answers selected, sending null');
			onAnswer(null, []);
		}
	};

	return (
		<div className="quiz_question-item__container">
			<span className="quiz-question-item__title">{question.title}</span>
			<div>
				{question.answers.map((answer) => (
					<label key={answer._id} className="quiz-answer-in-list">
						<input
							type="checkbox"
							onChange={(e) => handleCheck(answer._id, e.target.checked)}
							checked={selectedAnswers.includes(answer._id)}
							className="quiz-new-question-item__checkbox"
						/>
						<p className="question-text">{answer.title}</p>
					</label>
				))}
			</div>
		</div>
	);
};
