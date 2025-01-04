import type { Positions } from './../js/solstice.d';

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

function Reading(props: { positions: Positions, name: string }) {
	const { name, positions } = props;

	return(
		<>
			<h3>Baseball Solstice Dates for the {name}</h3>
			<p><span>First Base Solstice:</span> {formatDate(positions.firstSolstice)}</p>
			<p><span>Second Base Solstice:</span> {formatDate(positions.secondSolstice)}</p>
			<p><span>Third Base Solstice:</span> {formatDate(positions.thirdSolstice)}</p>
		</>
	)
}

export default Reading;