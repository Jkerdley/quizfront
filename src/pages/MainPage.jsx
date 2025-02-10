import './styles/MainPage.css';
import { StoryQuizContainer, LinkButton } from '../components';
import { ClearStorageButton } from '../components/ClearStorageButton';
import { useDispatch, useSelector } from 'react-redux';
import { loadQuizHistory } from '../store/actions/historyActions';
import { useEffect } from 'react';

export const MainPage = () => {
	const dispatch = useDispatch();
	const { attempts } = useSelector((state) => state.history);
	console.log('attempts', attempts);
	//FIXME: двойной рендеринг
	useEffect(() => {
		dispatch(loadQuizHistory());
	}, [dispatch]);

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
