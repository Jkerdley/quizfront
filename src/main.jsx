import { createRoot } from 'react-dom/client';
import './index.css';
import { Layout } from './Layout.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { EditPage, MainPage, NotFoundPage, QuizPage, ResultsPage } from './pages/index.js';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <MainPage /> },
			{ path: 'edit', element: <EditPage /> },
			{
				path: 'quiz',
				children: [
					{
						path: ':questionId',
						element: <QuizPage />,
						loader: async ({ params }) => {
							const questionId = parseInt(params.questionId);
							// Проверка на всякий случай
							if (isNaN(questionId) || questionId < 0) {
								throw new Response('Not Found', { status: 404 });
							}
							return { questionId };
						},
					},
					{
						path: 'results',
						element: <ResultsPage />,
					},
					{ index: true, element: <QuizPage /> },
				],
			},
			{ path: '*', element: <NotFoundPage /> },
		],
	},
]);

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
