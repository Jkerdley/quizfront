import { useState } from 'react';
import './styles/QuestionItem.css'; // Импортируем стили для QuestionItem
import { CorrectAnswerIndicator } from './CorrectAnswerIndicator';
import { NewAnswerInput } from './NewAnswerInput';
import { AddNewAnswerButton } from './AddNewAnswerButton';

export function QuestionItem({ question, onRemove, onEdit }) {
	const [isEditing, setIsEditing] = useState(false);
	const [newTitle, setNewTitle] = useState(question.title);
	const [answers, setAnswers] = useState(question.answers);

	const handleSave = () => {
		onEdit(question._id, newTitle, answers);
		setIsEditing(false);
	};

	return (
		<li className="question-item">
			{isEditing ? (
				<div className="question-item__edit-mode">
					<input
						type="text"
						className="question-item__input--title"
						value={newTitle}
						onChange={(e) => setNewTitle(e.target.value)}
					/>

					<div className="inedit-container">
						{answers.map((answer, index) => (
							<NewAnswerInput
								key={answer._id}
								index={index}
								answer={answer}
								answers={answers}
								setAnswers={setAnswers}
							/>
						))}
						<AddNewAnswerButton setAnswers={setAnswers} answers={answers} />
					</div>
					<div className="question-item__edit-buttons-container">
						<button className="question-item__button" onClick={handleSave}>
							Сохранить
						</button>
						<button
							className="question-item__button question-item__button--remove"
							onClick={() => setIsEditing(false)}
						>
							Отмена
						</button>
					</div>
				</div>
			) : (
				<>
					<div className="question-item__header">
						<span className="question-item__title">{question.title}</span>
						<div className="question-item__edit-buttons-container">
							<button className="question-item__button" onClick={() => setIsEditing(true)}>
								Редактировать
							</button>
							<button
								className="question-item__button question-item__button--remove"
								onClick={() => onRemove(question._id)}
							>
								&times;
							</button>
						</div>
					</div>
					<div>
						{answers.map((answer, index) => (
							<div key={answer._id} className="answer-in-list">
								<p className="question-text">{answer.title}</p>
								<CorrectAnswerIndicator isTrueAnswer={answer.isTrueAnswer} />
							</div>
						))}
					</div>
				</>
			)}
		</li>
	);
}
