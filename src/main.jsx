import { createRoot } from 'react-dom/client';
import './index.css';
import { Layout } from './Layout.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { EditPage, MainPage, NotFoundPage } from './pages/index.js';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,

		children: [
			{ index: true, element: <MainPage /> },
			{ path: 'edit', element: <EditPage /> },
			{ path: '*', element: <NotFoundPage /> },
		],
	},
]);

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
