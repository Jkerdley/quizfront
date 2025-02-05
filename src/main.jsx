import { createRoot } from 'react-dom/client'; // Импорт функции для создания корневого элемента
import './index.css'; // Глобальные стили
import { Layout } from './Layout.jsx'; // Базовая разметка (Layout)
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Импорт роутера
import { EditPage, MainPage, NotFoundPage, QuizPage, ResultsPage } from './pages/index.js'; // Импорт страниц приложения
import { store } from './store/store.js'; // Redux‑store
import { Provider } from 'react-redux'; // Провайдер для работы с Redux

// Создаём роутер с описанием маршрутов приложения
const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />, // Обёртка, в которой выводятся дочерние маршруты
		children: [
			{ index: true, element: <MainPage /> }, // Главная страница
			{ path: 'edit', element: <EditPage /> }, // Страница редактирования теста
			{
				path: 'quiz',
				children: [
					{
						path: ':questionId',
						element: <QuizPage />, // Страница теста по id вопроса
						loader: async ({ params }) => {
							const questionId = parseInt(params.questionId);
							// Если id некорректный, выбрасываем ошибку 404
							if (isNaN(questionId) || questionId < 0) {
								throw new Response('Not Found', { status: 404 });
							}
							return { questionId };
						},
					},
					{
						path: 'results',
						element: <ResultsPage />, // Страница результатов
					},
					{ index: true, element: <QuizPage /> }, // Страница теста по умолчанию
				],
			},
			{ path: '*', element: <NotFoundPage /> }, // Ошибка 404 для всех неопределённых маршрутов
		],
	},
]);

// Рендеринг приложения в корневой элемент с подключённым Redux‑store
createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>,
);
