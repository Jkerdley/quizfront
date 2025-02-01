import { useEffect, useState } from 'react';
import './styles/StoryQuizContainer.css';
import { getQuizAttempts } from '../utils';
export const StoryQuizContainer = () => {
	const [quizStory, setQuizStory] = useState([]);

	useEffect(() => {
		const attempts = getQuizAttempts();
		console.log('attempts in useeffect StoryQuizContainer', attempts);

		if (Array.isArray(attempts)) {
			setQuizStory(attempts);
		} else {
			console.error('Invalid data in localStorage');
		}
	}, []);

	return (
		<div>
			<h3>История прохождений</h3>
			{quizStory.map((storyItem) => {
				return (
					<div key={storyItem.storyId} className="story-quiz-items">
						<div className="story-quiz-item__container">
							<p>{storyItem.answersDate}</p>
							<div className="answers_and_progressbar__container">
								<p>0</p>
								<div className="story-quiz_progress-bar-container">
									{storyItem.answersStory.map((answer, index) => {
										if (answer === null) {
											return (
												<div key={index} className="story-quiz_progress-gray"></div>
											);
										} else if (answer === true) {
											return (
												<div
													key={index}
													className="story-quiz_progress-bars_green"
												></div>
											);
										} else {
											return (
												<div
													key={index}
													className="story-quiz_progress-bars_red"
												></div>
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
				);
			})}
		</div>
	);
};
