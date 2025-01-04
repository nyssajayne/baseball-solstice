import { SetStateAction, useState } from "react";

function Search() {
	const [searchValue, setSearchValue] = useState("");

	const handleSearchValue = (event: { target: { value: SetStateAction<string>; }; }) => {
		setSearchValue(event.target.value);
	};
	
	return (
		<input type="text" value={searchValue} onChange={handleSearchValue} />
	)
}

export default Search;