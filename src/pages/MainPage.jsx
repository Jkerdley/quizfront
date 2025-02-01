import './styles/MainPage.css';
import { StoryQuizContainer, LinkButton } from '../components';
import { ClearStorageButton } from '../components/ClearStorageButton';
import { getQuizAttempts } from '../utils';
export const MainPage = () => {
	const isThereAnyHistory = getQuizAttempts();
	console.log('isThereAnyHistory', isThereAnyHistory);

	return (
		<div className="mainpage-cointainer">
			<h1>Welcome to QUIZ</h1>
			<div className="mainpage-buttons-cointainer">
				<LinkButton to={'/quiz'} className={'question-item__button mainpage-begin-button'}>
					Запустить тест
				</LinkButton>
				<LinkButton to={'/edit'} className={'question-item__button mainpage-edit-button'}>
					Редактировать тест
				</LinkButton>
			</div>
			{isThereAnyHistory.length !== 0 && (
				<>
					<StoryQuizContainer />
					<ClearStorageButton />
				</>
			)}
		</div>
	);
};
