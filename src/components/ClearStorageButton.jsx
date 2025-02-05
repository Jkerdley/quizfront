import './styles/ClearStorageButton.css';
import { useDispatch } from 'react-redux';
import { clearHistory } from '../store/actions/historyActions';

// Компонент кнопки для очистки истории тестов
export const ClearStorageButton = () => {
	const dispatch = useDispatch();

	const handleClearStorage = () => {
		// Подтверждение действия
		if (window.confirm('Вы уверены, что хотите очистить историю прохождений?')) {
			dispatch(clearHistory());
			// Redux‑store обновится, и история исчезнет с экрана
		}
	};

	return (
		<button className="clear-storage-button" onClick={handleClearStorage}>
			Очистить историю
		</button>
	);
};
