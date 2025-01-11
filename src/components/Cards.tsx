import styles from './Cards.module.css';

function Cards(props: {children: React.ReactNode}) {
	const { children } = props;

	return (
		<div className={styles.cards}>
			{children}		
		</div>
	)
}

export default Cards;