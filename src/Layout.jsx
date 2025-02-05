import { Outlet } from 'react-router-dom'; // Outlet – место для дочерних маршрутов

// Лэйаут просто отображает дочерние маршруты
export const Layout = () => {
	return <Outlet />; // Здесь будут подставляться страницы: MainPage, EditPage, QuizPage и т.д.
};
