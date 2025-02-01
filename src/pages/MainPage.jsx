import './styles/MainPage.css';
import { StoryQuizContainer, LinkButton } from '../components';
import { useState } from 'react';
import { ClearStorageButton } from '../components/ClearStorageButton';
export const MainPage = () => {
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
			<StoryQuizContainer />
			<ClearStorageButton />
		</div>
	);
};
