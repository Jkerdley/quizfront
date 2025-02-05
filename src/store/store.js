import { legacy_createStore, combineReducers, applyMiddleware } from 'redux'; // Функции для создания Redux‑store
// Рекомендуется импортировать thunk как значение, а не как деструктуризацию:
import { thunk } from 'redux-thunk'; // Импорт redux‑thunk для асинхронных действий

import { quizReducer } from './reducers/quizReducer';
import { historyReducer } from './reducers/historyReducer';

// Комбинируем все редьюсеры в один корневой редьюсер
const rootReducer = combineReducers({
	quiz: quizReducer,
	history: historyReducer,
});

// Создаём Redux‑store с применением middleware thunk
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
