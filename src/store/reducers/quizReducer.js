import {
	FETCH_QUESTIONS_REQUEST,
	FETCH_QUESTIONS_SUCCESS,
	FETCH_QUESTIONS_ERROR,
	ADD_QUESTION,
	DELETE_QUESTION,
	UPDATE_QUESTION,
} from '../types';

// Начальное состояние данных теста
const initialState = {
	questions: [], // Массив вопросов
	loading: false, // Флаг загрузки данных
	error: null, // Ошибка при загрузке
};

export const quizReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_QUESTIONS_REQUEST:
			return { ...state, loading: true }; // Начата загрузка вопросов
		case FETCH_QUESTIONS_SUCCESS:
			return { ...state, questions: action.payload, loading: false }; // Вопросы успешно загружены
		case FETCH_QUESTIONS_ERROR:
			return { ...state, error: action.error, loading: false }; // Ошибка загрузки
		case ADD_QUESTION:
			// Если сервер возвращает массив вопросов, заменяем текущий список
			if (Array.isArray(action.payload)) {
				return { ...state, questions: action.payload };
			}
			// Если payload – один вопрос, добавляем его в массив
			return { ...state, questions: [...state.questions, action.payload] };
		case DELETE_QUESTION:
			return {
				...state,
				questions: state.questions.filter((question) => question._id !== action.payload),
			};
		case UPDATE_QUESTION:
			return {
				...state,
				questions: state.questions.map((question) =>
					question._id === action.payload.id ? { ...question, ...action.payload.data } : question,
				),
			};
		default:
			return state;
	}
};
