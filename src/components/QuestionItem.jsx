import { useState } from 'react';
import './styles/QuestionItem.css';
import { CorrectAnswerIndicator } from './CorrectAnswerIndicator';
import { NewAnswerInput } from './NewAnswerInput';
import { AddNewAnswerButton } from './AddNewAnswerButton';
import { useDispatch } from 'react-redux';
import { deleteQuestion, updateQuestion } from '../store/actions/quizActions';

export function QuestionItem({ question, isDisabled }) {
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false); // Флаг режима редактирования
	const [newTitle, setNewTitle] = useState(question.title); // Локальное состояние для нового заголовка
	const [answers, setAnswers] = useState(question.answers || []); // Варианты ответов (если их нет — пустой массив)

	// Функция сохранения изменений вопроса
	const handleSave = () => {
		dispatch(updateQuestion(question._id, { title: newTitle, answers }));
		setIsEditing(false);
	};

	// Функция удаления вопроса
	const handleRemove = () => {
		dispatch(deleteQuestion(question._id));
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
								key={answer._id || index}
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
								onClick={handleRemove}
								disabled={isDisabled} // Блокируем удаление, если вопросов меньше 2
							>
								&times;
							</button>
						</div>
					</div>
					<div>
						{answers.map((answer, index) => (
							<div key={answer._id || index} className="answer-in-list">
								<ul>
									<li className="question-text">{answer.title}</li>
								</ul>
								{/* Отображаем индикатор правильного ответа */}
								<CorrectAnswerIndicator isTrueAnswer={answer.isTrueAnswer} />
							</div>
						))}
					</div>
				</>
			)}
		</li>
	);
}
