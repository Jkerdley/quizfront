import { Link } from 'react-router-dom';

export const LinkButton = ({ children, className, to, disabled }) => {
	return (
		<Link to={to}>
			<button className={className} disabled={disabled}>
				{children}
			</button>
		</Link>
	);
};
