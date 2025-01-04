import { SetStateAction, useState } from "react";
import type { Solstice } from "../js/solstice.d";

function Search(props: {teams: Solstice[]}) {
	const [searchValue, setSearchValue] = useState("");

	const handleSearchValue = (event: { target: { value: SetStateAction<string>; }; }) => {
		setSearchValue(event.target.value);

		// let updatedTeamsView = teams.map((team) => {
		// let updatedTeam = team;
		// let name = team.name.toLowerCase()
		// if(name.includes(searchValue)) {
		// 	updatedTeam.showTeam = true;
		// }
		// else {
		// updatedTeam.showTeam = false;
		// }

		// return updatedTeam;
		// })
	};
	
	return (
		<input type="text" value={searchValue} onChange={handleSearchValue} />
	)
}

export default Search;