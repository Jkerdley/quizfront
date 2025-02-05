import '../components/styles/QuestionWithAnswersComponent.css';
import { useEffect, useState } from 'react';

export const QuestionWithAnswersComponent = ({ question, onAnswer, initialSelectedAnswers = [] }) => {
	const [selectedAnswers, setSelectedAnswers] = useState(initialSelectedAnswers);

	// Сброс выбранных ответов, если изменился вопрос
	useEffect(() => {
		setSelectedAnswers(initialSelectedAnswers);
	}, [question?._id, initialSelectedAnswers]);

	// Обработчик изменения состояния чекбокса для ответа
	const handleCheck = (answerId, isChecked) => {
		// Обновление выбранных ответов
		const newSelected = isChecked
			? [...selectedAnswers, answerId]
			: selectedAnswers.filter((id) => id !== answerId);

		setSelectedAnswers(newSelected);

		// Если выбран хотя бы один ответ, проверяем корректность
		if (newSelected.length > 0) {
			// Получаем _id правильных ответов из вопроса
			const correctAnswers = question.answers.filter((a) => a.isTrueAnswer).map((a) => a._id);

			// Сравниваем массивы
			const arraysEqual =
				newSelected.length === correctAnswers.length &&
				[...newSelected].sort().every((val, idx) => val === [...correctAnswers].sort()[idx]);

			const isCorrect = arraysEqual;
			onAnswer(isCorrect, newSelected);
		} else {
			onAnswer(null, []);
		}
	};

	return (
		<div className="quiz_question-item__container">
			<span className="quiz-question-item__title">{question.title}</span>
			<div>
				{/* Перебор вариантов ответов */}
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
