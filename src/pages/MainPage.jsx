import './styles/MainPage.css';
import { StoryQuizContainer, LinkButton } from '../components';
import { ClearStorageButton } from '../components/ClearStorageButton';
import { useSelector } from 'react-redux';

export const MainPage = () => {
	const { attempts } = useSelector((state) => state.history);
	const isThereAnyHistory = attempts.length > 0;

	return (
		<div className="mainpage-cointainer">
			<h1>Welcome to QUIZ</h1>
			<div className="mainpage-buttons-cointainer">
				<LinkButton to={`/quiz`} className={'question-item__button mainpage-begin-button'}>
					Запустить тест
				</LinkButton>
				<LinkButton to={'/edit'} className={'question-item__button mainpage-edit-button'}>
					Редактировать тест
				</LinkButton>
			</div>
			{isThereAnyHistory && (
				<>
					<StoryQuizContainer />
					<ClearStorageButton />
				</>
			)}
		</div>
	);
};
