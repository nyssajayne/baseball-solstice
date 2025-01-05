import { useEffect, useRef } from "react";
import classes from './Diamond.module.css';
import type { Solstice } from './../js/solstice.d';

const nthNumber = (number: number) => {
  if (number > 3 && number < 21) return "th";
  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const formatDate = (originalDate: Date) => {
	const day = originalDate.toLocaleString("default", { weekday: "long"});
	const month = originalDate.toLocaleString("default", { month: "long"});
	const date = originalDate.getDate();
	const ordinal = nthNumber(date);
	const year = originalDate.getFullYear();
	const time = originalDate.toLocaleString("default", { timeStyle: "short"});

	return `${day}, ${month} ${date}${ordinal} ${year}, ${time}`;
}

const roundedTheBase = (solstice: Date) => {
	return solstice.valueOf() < new Date().valueOf() ? "active" : "inactive"

	// return "active"
}

const calculateFeet = (currentPosition: number) => {
	console.log(currentPosition);
	return 360 - Math.floor(360 * currentPosition);
}

function Diamond(props: { solstice: Solstice }) {
	const { codeName, name, positions, nextPlayTime } = props.solstice;
	const diamondRef = useRef(null);
	const firstBase = roundedTheBase(positions.firstSolstice);
	const secondBase = roundedTheBase(positions.secondSolstice);
	const thirdBase = roundedTheBase(positions.thirdSolstice);
	const homeBase = roundedTheBase(nextPlayTime);
	const nextBase = calculateFeet(positions.currentPosition);

	useEffect(() => {
		const { currentPosition } = positions
		const diamond = diamondRef.current;
		//@ts-ignore
		let totalLength = diamond.getTotalLength();
		let offSetlength = totalLength * currentPosition;
		// let offSetlength = 0;
		let animationSpeed = `${12 * currentPosition}s`;
		// let animationSpeed = `${12}s`;

		document.documentElement.style.setProperty('--animation-speed', `${animationSpeed}`);
		document.documentElement.style.setProperty('--offset-amount', `${offSetlength}`);
		document.documentElement.style.setProperty('--stroke-amount', `${totalLength}`);
	}, [])

	return(
		<div className={`${classes[codeName]} ${classes.wrapper}`}>
			<div className={classes.diamond}>
				<svg width="1759" height="1368" viewBox="0 0 1759 1368" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path className={classes.journey} ref={diamondRef} d="M954.943 1179.5C1067.68 1066.37 1270.54 863.077 1323.5 811.773L878.251 368.5L435.5 813.269L801.334 1179.5" strokeLinecap="round" strokeLinejoin="round"/>
					<path className={classes.complete} d="M954.943 1179.5C1067.68 1066.37 1270.54 863.077 1323.5 811.773L878.251 368.5L435.5 813.269L801.334 1179.5" strokeLinecap="round" strokeLinejoin="round"/>
					<path d="M1026.73 1355C1246.76 1134.32 1642.65 737.76 1746 637.683C1746 637.683 1355.79 11.1527 877.062 12.5C398.877 13.8458 13 640.601 13 640.601L726.953 1355" strokeLinecap="round" strokeLinejoin="round"/>
					<rect className={`${classes.base} ${classes[firstBase]} ${classes.firstBase}`} x="1218.32" y="813.5" width="148.037" height="148.037" transform="rotate(-45 1218.32 813.5)" strokeLinejoin="round"/>
					<rect className={`${classes.base} ${classes[secondBase]} ${classes.secondBase}`} x="774.322" y="368.5" width="148.037" height="148.037" transform="rotate(-45 774.322 368.5)" strokeLinejoin="round"/>
					<rect className={`${classes.base} ${classes[thirdBase]} ${classes.thirdBase}`} x="330.322" y="813.5" width="148.037" height="148.037" transform="rotate(-45 330.322 813.5)" strokeLinejoin="round"/>
					<path className={`${classes.base} ${classes[homeBase]} ${classes.homeBase}`} d="M892.888 1062.64C891.215 1057.49 886.415 1054 881 1054C875.585 1054 870.785 1057.49 869.112 1062.64L846.548 1132.08L773.531 1132.08C768.115 1132.08 763.316 1135.57 761.642 1140.72C759.969 1145.87 761.802 1151.51 766.183 1154.69L825.256 1197.61L802.692 1267.06C801.019 1272.21 802.852 1277.85 807.233 1281.03C811.614 1284.21 817.546 1284.21 821.928 1281.03L881 1238.11L940.072 1281.03C944.454 1284.21 950.386 1284.21 954.767 1281.03C959.148 1277.85 960.981 1272.21 959.308 1267.06L936.744 1197.61L995.817 1154.69C1000.2 1151.51 1002.03 1145.87 1000.36 1140.72C998.684 1135.57 993.885 1132.08 988.469 1132.08L915.452 1132.08L892.888 1062.64Z" fill="#D9D9D9" strokeLinejoin="round"/>
				</svg>
			</div>
			<div className={classes.reading}>
				<h3>Baseball Solstice Dates for the {name}</h3>
				<p className={`${classes.firstBase} ${classes[firstBase]} ${classes.date}`}><span>First Base Solstice:</span> {formatDate(positions.firstSolstice)}</p>
				{nextBase < 90 && <p>{90 - nextBase}ft until first base</p>}
				<p className={`${classes.secondBase} ${classes[secondBase]} ${classes.date}`}><span>Second Base Solstice:</span> {formatDate(positions.secondSolstice)}</p>
				{(nextBase > 90 && nextBase < 180) && <p>{180 - nextBase}ft until second base</p>}
				<p className={`${classes.thirdBase} ${classes[thirdBase]} ${classes.date}`}><span>Third Base Solstice:</span> {formatDate(positions.thirdSolstice)}</p>
				{(nextBase > 180 && nextBase < 270) && <p>{270 - nextBase}ft until third base</p>}
				<p className={`${classes.homeBase} ${classes[homeBase]} ${classes.date}`}><span>Opening Day:</span> {formatDate(nextPlayTime)}</p>
				{(nextBase > 270 && nextBase < 360) && <p>{360 - nextBase}ft until home base</p>}
			</div>
		</div>
	)
}

export default Diamond;