import './styles/ClearStorageButton.css'; // Создайте файл стилей, если нужно
import { clearQuizHistory } from '../utils/storage';

export const ClearStorageButton = () => {
	const handleClearStorage = () => {
		if (window.confirm('Вы уверены, что хотите очистить историю прохождений?')) {
			clearQuizHistory();
			window.location.reload();
		}
	};

	return (
		<button className="clear-storage-button" onClick={handleClearStorage}>
			Очистить историю
		</button>
	);
};
