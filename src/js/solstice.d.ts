export interface Team {
	id: number;
	name: string,
	codeName: string,
	clubName: string
}

interface Game {
	home: string;
	away: string;
	firstPlay: string
}

export interface Positions {
	currentPosition: number,
	firstSolstice: Date,
	secondSolstice: Date,
	thirdSolstice: Date
}

export interface Solstice extends Team {
	nextPlayTime: Date,
    lastPlayTime: Date,
    positions: Positions
}