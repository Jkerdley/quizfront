import { useState } from 'react';
import './styles/QuestionItem.css'; // Импортируем стили для QuestionItem

export function QuestionItem({ question, onRemove, onEdit }) {
	const [isEditing, setIsEditing] = useState(false);
	const [newTitle, setNewTitle] = useState(question.title);
	const [answers, setAnswers] = useState(question.answers);
	console.log('question answers in list', answers);
	console.log('question in list', question);

	const handleSave = () => {
		onEdit(question._id, newTitle, answers);
		setIsEditing(false);
	};

	const handleAnswerChange = (index, newValue) => {
		const updatedAnswers = [...answers];
		updatedAnswers[index].title = newValue;
		setAnswers(updatedAnswers);
	};

	return (
		<li className="question-item">
			{isEditing ? (
				<div className="question-item__edit-mode">
					<input
						type="text"
						className="question-item__input"
						value={newTitle}
						onChange={(e) => setNewTitle(e.target.value)}
					/>

					<div>
						{answers.map((answer, index) => (
							<div key={answer.id} className="flex items-center gap-2 mb-2">
								<input
									className="question-item__input"
									type="text"
									value={answer.title}
									onChange={(e) => handleAnswerChange(index, e.target.value)}
								/>
							</div>
						))}
					</div>
					<div className="question-item__edit-buttons-conteiner">
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
						<div className="question-item__save-buttons-conteiner">
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
							<div key={answer.id} className="flex items-center gap-2 mb-2">
								<p className="question-text">{answer.title}</p>
							</div>
						))}
					</div>
				</>
			)}
		</li>
	);
}
