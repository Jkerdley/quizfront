import { EditPage } from './pages';
import { Routes, Route, BrowserRouter, Outlet } from 'react-router-dom';
export const Layout = () => {
	return <Outlet />;
};

/* <BrowserRouter>
	<Routes>
		<Route path="/" element={<EditPage />} />
	</Routes>
</BrowserRouter>; */
