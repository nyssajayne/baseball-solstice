import styles from './Card.module.css';

function Card(props: {children: React.ReactNode, active: boolean}) {
	const { active, children } = props;

	return (
		<div className={active ? `${styles.card} ${styles.active}` : styles.card}>
			<div className={`${styles.inner}`}>
	          {children}
          </div>
        </div>
	)
}

export default Card;