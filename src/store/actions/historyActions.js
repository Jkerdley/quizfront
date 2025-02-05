import { LOAD_HISTORY, ADD_ATTEMPT, CLEAR_HISTORY, HISTORY_REQUEST, HISTORY_FAILURE } from '../types';

// Экшен для загрузки истории из localStorage
export const loadQuizHistory = () => (dispatch) => {
	dispatch({ type: HISTORY_REQUEST });
	try {
		const stored = localStorage.getItem('quizStory'); // Получаем данные из localStorage
		const history = stored ? JSON.parse(stored) : []; // Если данных нет, используем пустой массив
		dispatch({
			type: LOAD_HISTORY,
			payload: history,
		});
	} catch (error) {
		dispatch({
			type: HISTORY_FAILURE,
			payload: error.message,
		});
	}
};

// Экшен для сохранения новой попытки теста
export const saveAttempt = (attempt) => (dispatch, getState) => {
	dispatch({ type: HISTORY_REQUEST });
	try {
		const { history } = getState(); // Получаем текущее состояние истории
		const newAttempts = [...history.attempts, attempt]; // Добавляем новую попытку
		localStorage.setItem('quizStory', JSON.stringify(newAttempts)); // Сохраняем в localStorage
		dispatch({
			type: ADD_ATTEMPT,
			payload: attempt,
		});
	} catch (error) {
		dispatch({
			type: HISTORY_FAILURE,
			payload: error.message,
		});
	}
};

// Экшен для очистки истории тестов
export const clearHistory = () => (dispatch) => {
	dispatch({ type: HISTORY_REQUEST });
	try {
		localStorage.removeItem('quizStory'); // Удаляем данные из localStorage
		dispatch({ type: CLEAR_HISTORY });
	} catch (error) {
		dispatch({
			type: HISTORY_FAILURE,
			payload: error.message,
		});
	}
};
