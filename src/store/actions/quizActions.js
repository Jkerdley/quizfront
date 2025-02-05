import axios from 'axios'; // Для выполнения HTTP‑запросов
import {
	FETCH_QUESTIONS_REQUEST,
	FETCH_QUESTIONS_SUCCESS,
	FETCH_QUESTIONS_ERROR,
	ADD_QUESTION,
	DELETE_QUESTION,
	UPDATE_QUESTION,
} from '../types';

// Базовый URL для запросов к серверу
const API_URL = 'http://localhost:3005/';

// Экшен для загрузки вопросов с сервера
export const fetchQuestions = () => async (dispatch) => {
	try {
		dispatch({ type: FETCH_QUESTIONS_REQUEST }); // Устанавливаем флаг загрузки
		const response = await axios.get(API_URL); // GET‑запрос к серверу
		// Ожидается, что сервер вернёт объект { questions: [...] }
		console.log('response', response);

		dispatch({ type: FETCH_QUESTIONS_SUCCESS, payload: response.data.questions });
	} catch (error) {
		dispatch({ type: FETCH_QUESTIONS_ERROR, error: error.message }); // Обработка ошибки
	}
};

// Экшен для добавления нового вопроса
export const addQuestion = (question) => async (dispatch) => {
	try {
		// POST‑запрос отправляет вопрос на сервер
		const response = await axios.post(API_URL, question);
		// Если сервер возвращает весь список вопросов, редьюсер перезапишет список
		dispatch({ type: ADD_QUESTION, payload: response.data });
	} catch (error) {
		console.error('[addQuestion] Ошибка добавления вопроса:', error);
	}
};

// Экшен для удаления вопроса по id
export const deleteQuestion = (id) => async (dispatch) => {
	try {
		await axios.delete(`${API_URL}${id}`);
		dispatch({
			type: DELETE_QUESTION,
			payload: id, // Передаём id удаляемого вопроса
		});
	} catch (error) {
		console.error('Ошибка при удалении вопроса', error);
	}
};

// Экшен для обновления вопроса по id. updateData – обновлённые данные вопроса
export const updateQuestion = (id, updateData) => async (dispatch) => {
	try {
		// PUT‑запрос обновляет данные на сервере
		const response = await axios.put(`${API_URL}${id}`, updateData);
		dispatch({
			type: UPDATE_QUESTION,
			payload: { id, data: updateData }, // Используем данные ответа сервера
		});
	} catch (error) {
		console.error('Ошибка обновления вопроса:', error);
	}
};
