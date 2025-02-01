export const saveQuizAttempt = (attempt) => {
	console.log('attempt in saveQuizAttempt', attempt);
	const historyArray = JSON.parse(localStorage.getItem('quizStory')) || [];
	historyArray.push(attempt);
	console.log('historyArray in saveQuizAttempt', historyArray);

	localStorage.setItem('quizStory', JSON.stringify(historyArray));
};

export const getQuizAttempts = () => {
	return JSON.parse(localStorage.getItem('quizStory')) || [];
};

export const clearQuizHistory = () => {
	localStorage.removeItem('quizStory');
	console.log('LocalStorage очищен.');
};
