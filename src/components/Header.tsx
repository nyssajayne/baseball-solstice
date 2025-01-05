import Logo from './Logo';
import classes from './Header.module.css';

function Header() {
	return (
		<header>
			<Logo />
			<h1 className={classes.h1}>Offseason Baseball Solstice Calculator</h1>
      		<h2  className={classes.h2}>Are you closer to your last game of baseball or your next game of baseball this off-season?<br />
      			Search for your team and find out!</h2>
		</header>
	)
}

export default Header;