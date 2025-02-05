import './styles/StoryQuizContainer.css';
import { useSelector } from 'react-redux';

// Компонент для отображения истории попыток тестирования
export const StoryQuizContainer = () => {
	// Извлекаем историю попыток из Redux‑store
	const { attempts } = useSelector((state) => state.history);

	return (
		<div>
			<h3>История прохождений</h3>
			{attempts.map((storyItem) => (
				<div key={storyItem.storyId} className="story-quiz-items">
					<div className="story-quiz-item__container">
						<p>{storyItem.answersDate}</p>
						<div className="answers_and_progressbar__container">
							<p>0</p>
							<div className="story-quiz_progress-bar-container">
								{storyItem.answersStory.map((answer, index) => {
									if (answer === null) {
										return <div key={index} className="story-quiz_progress-gray"></div>;
									} else if (answer === true) {
										return (
											<div key={index} className="story-quiz_progress-bars_green"></div>
										);
									} else {
										return (
											<div key={index} className="story-quiz_progress-bars_red"></div>
										);
									}
								})}
							</div>
							<p>{storyItem.answersStory.length}</p>
						</div>
						<div className="story-quiz_true-answers-container">
							Верно {storyItem.answersStory.filter((item) => item === true).length}
							<p>из</p>
							{storyItem.answersStory.length}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
