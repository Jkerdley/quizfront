import { LOAD_HISTORY, ADD_ATTEMPT, CLEAR_HISTORY, HISTORY_REQUEST, HISTORY_FAILURE } from '../types';

// Начальное состояние для истории попыток теста
const initialState = {
	attempts: [], // Массив попыток (можно сохранить в localStorage)
	loadingHistory: false, // Флаг загрузки истории
	errorHistory: null, // Ошибка загрузки истории, если возникла
};

export const historyReducer = (state = initialState, action) => {
	switch (action.type) {
		case HISTORY_REQUEST:
			return {
				...state,
				loadingHistory: true,
				errorHistory: null,
			};
		case LOAD_HISTORY:
			return {
				...state,
				attempts: action.payload, // Загружаем историю из action
				loadingHistory: false,
			};
		case ADD_ATTEMPT:
			return {
				...state,
				attempts: [...state.attempts, action.payload], // Добавляем новую попытку
				loadingHistory: false,
			};
		case CLEAR_HISTORY:
			return {
				...state,
				attempts: [], // Очищаем историю
				loadingHistory: false,
			};
		case HISTORY_FAILURE:
			return {
				...state,
				loadingHistory: false,
				errorHistory: action.payload, // Сохраняем сообщение об ошибке
			};
		default:
			return state; // По умолчанию возвращаем текущее состояние
	}
};
