import { Link } from 'react-router-dom';
export const MainPage = () => {
	return (
		<div>
			<h1>Hello MAIN</h1>
			<Link to="/edit">
				<button className="question-item__button">Редактировать вопросы</button>
			</Link>
			<Link to="/quiz">
				<button className="question-item__button">Начать тестирование</button>
			</Link>
		</div>
	);
};
