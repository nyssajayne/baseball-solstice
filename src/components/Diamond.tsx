import { useEffect, useRef, useState } from "react";
import classes from './Diamond.module.css';
import type { Solstice } from './../js/solstice.d';
import Reading from './Reading'

function roundedTheBase(solstice: Date) {
	return solstice.valueOf() < new Date().valueOf() ? "active" : "inactive"
}

function Diamond(props: { solstice: Solstice }) {
	const { codeName, name, positions, nextPlayTime } = props.solstice;
	const diamondRef = useRef(null);
	const [diamondLength, setDiamondLength] = useState(0);
	const [diamondOffset, setDiamondOffset] = useState(0);
	const firstBase = roundedTheBase(positions.firstSolstice);
	const secondBase = roundedTheBase(positions.secondSolstice);
	const thirdBase = roundedTheBase(positions.thirdSolstice);
	const homeBase = roundedTheBase(nextPlayTime)

	useEffect(() => {
		const diamond = diamondRef.current;
		let totalLength = diamond.getTotalLength();

		setDiamondLength(totalLength);
		setDiamondOffset(totalLength * positions.currentPosition);
	}, [])

	return(
		<div className={`${classes[codeName]} ${classes.wrapper}`}>
			<div className={classes.diamond}>
				<svg width="1759" height="1368" viewBox="0 0 1759 1368" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path className={classes.journey} strokeDasharray={diamondLength} strokeDashoffset={diamondOffset} ref={diamondRef} d="M954.943 1179.5C1067.68 1066.37 1270.54 863.077 1323.5 811.773L878.251 368.5L435.5 813.269L801.334 1179.5" strokeLinecap="round" strokeLinejoin="round"/>
					<path className={`${classes.complete} anotherClass`} d="M954.943 1179.5C1067.68 1066.37 1270.54 863.077 1323.5 811.773L878.251 368.5L435.5 813.269L801.334 1179.5" strokeLinecap="round" strokeLinejoin="round"/>
					<path d="M1026.73 1355C1246.76 1134.32 1642.65 737.76 1746 637.683C1746 637.683 1355.79 11.1527 877.062 12.5C398.877 13.8458 13 640.601 13 640.601L726.953 1355" strokeLinecap="round" strokeLinejoin="round"/>
					<rect className={`${classes.base} ${classes[firstBase]}`} x="1218.32" y="813.5" width="148.037" height="148.037" transform="rotate(-45 1218.32 813.5)" strokeLinejoin="round"/>
					<rect className={`${classes.base} ${classes[secondBase]}`} x="774.322" y="368.5" width="148.037" height="148.037" transform="rotate(-45 774.322 368.5)" strokeLinejoin="round"/>
					<rect className={`${classes.base} ${classes[thirdBase]}`} x="330.322" y="813.5" width="148.037" height="148.037" transform="rotate(-45 330.322 813.5)" strokeLinejoin="round"/>
					<path className={`${classes.base} ${classes[homeBase]}`} d="M892.888 1062.64C891.215 1057.49 886.415 1054 881 1054C875.585 1054 870.785 1057.49 869.112 1062.64L846.548 1132.08L773.531 1132.08C768.115 1132.08 763.316 1135.57 761.642 1140.72C759.969 1145.87 761.802 1151.51 766.183 1154.69L825.256 1197.61L802.692 1267.06C801.019 1272.21 802.852 1277.85 807.233 1281.03C811.614 1284.21 817.546 1284.21 821.928 1281.03L881 1238.11L940.072 1281.03C944.454 1284.21 950.386 1284.21 954.767 1281.03C959.148 1277.85 960.981 1272.21 959.308 1267.06L936.744 1197.61L995.817 1154.69C1000.2 1151.51 1002.03 1145.87 1000.36 1140.72C998.684 1135.57 993.885 1132.08 988.469 1132.08L915.452 1132.08L892.888 1062.64Z" fill="#D9D9D9" strokeLinejoin="round"/>
				</svg>
			</div>
			<div className={classes.reading}>
				<Reading positions={positions} name={name} />
			</div>
		</div>
	)
}

export default Diamond;