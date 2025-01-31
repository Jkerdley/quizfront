import './styles/CorrectAnswerIndicator.css';
export const CorrectAnswerIndicator = ({ isTrueAnswer }) => {
	if (!isTrueAnswer) return null;

	return (
		<div className="correct-indicator">
			<svg className="checkmark">
				<path fill="none" stroke="#fff" strokeWidth="3" d="M4 12l4 4 20-20" />
			</svg>
		</div>
	);
};
