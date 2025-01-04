import type { Positions } from './../js/solstice.d';
import classes from './Diamond.module.css';

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

function Reading(props: { positions: Positions, name: string, nextPlayTime: Date }) {
	const { name, nextPlayTime, positions } = props;

	return(
		<>
			<h3>Baseball Solstice Dates for the {name}</h3>
			<p className={`${classes.firstBase} ${classes.date}`}><span>First Base Solstice:</span> {formatDate(positions.firstSolstice)}</p>
			<p className={`${classes.secondBase} ${classes.date}`}><span>Second Base Solstice:</span> {formatDate(positions.secondSolstice)}</p>
			<p className={`${classes.thirdBase} ${classes.date}`}><span>Third Base Solstice:</span> {formatDate(positions.thirdSolstice)}</p>
			<p className={`${classes.homeBase} ${classes.date}`}><span>Opening Day:</span> {formatDate(nextPlayTime)}</p>
		</>
	)
}

export default Reading;