import type { Solstice, Team } from './solstice.d';

const getOpeningDay = (name: string) => {
  const games = [
    {
      away: "New York Mets",
      home: "Houston Astros",
      timeZone: "US/Central",
      firstPlay: "2025-03-27T13:10:00-05:00"
    },
    {
      away: "San Francisco Giants",
      home: "Cincinnati Reds",
      timeZone: "US/Eastern",
      firstPlay: "2025-03-27T13:10:00-04:00"
    },
    {
      away: "Boston Red Sox",
      home: "Texas Rangers",
      timeZone: "US/Central",
      firstPlay: "2025-03-27T13:10:00-05:00"
    },
    {
      away: "Colorado Rockies",
      home: "Tampa Bay Rays",
      timeZone: "US/Eastern", 
      firstPlay: "2025-03-27T13:10:00-04:00"
    },
    {
      away: "Minnesota Twins",
      home: "St. Louis Cardinals",
      timeZone: "US/Central",
      firstPlay: "2025-03-27T13:10:00-05:00"
    },
    {
      away: "Baltimore Orioles",
      home: "Toronto Blue Jays",
      timeZone: "US/Eastern",
      firstPlay: "2025-03-27T13:10:00-04:00"
    },
    {
      away: "Los Angeles Angels",
      home: "Chicago White Sox",
      timeZone: "US/Eastern",
      firstPlay: "2025-03-27T13:10:00-04:00"
    },
    {
      away: "Philadelphia Phillies",
      home: "Washington Nationals",
      timeZone: "US/Eastern",
      firstPlay: "2025-03-27T13:10:00-04:00"
    },
    {
      away: "Chicago Cubs",
      home: "Arizona Diamondbacks",
      timeZone: "US/Arizona",
      firstPlay: "2025-03-27T13:10:00-07:00"
    },
    {
      away: "Pittsburgh Pirates",
      home: "Miami Marlins",
      timeZone: "US/Eastern",
      firstPlay: "2025-03-27T13:10:00-04:00"
    },
    {
      away: "Detroit Tigers",
      home: "Los Angeles Dodgers",
      timeZone: "US/Pacific",
      firstPlay: "2025-03-27T13:10:00-07:00"
    },
    {
      away: "Milwaukee Brewers",
      home: "New York Yankees",
      timeZone: "US/Eastern",
      firstPlay: "2025-03-27T13:10:00-04:00"
    },
    {
      away: "Athletics",
      home: "Seattle Mariners",
      timeZone: "US/Eastern",
      firstPlay: "2025-03-27T13:10:00-04:00"
    },
    {
      away: "Cleveland Guardians",
      home: "Kansas City Royals",
      timeZone: "US/Central",
      firstPlay: "2025-03-27T13:10:00-05:00"
    },
    {
      away: "Atlanta Braves",
      home: "San Diego Padres",
      timeZone: "US/Pacific",
      firstPlay: "2025-03-27T13:10:00-07:00"
    }
  ];

  let foundGame = games.find((game) => game.away === name || game.home === name);

  if(foundGame) {
    const { firstPlay, timeZone } = foundGame
    return { firstPlay, timeZone };
  }

  return false
};

const getMLBTeams = () => {
  return new Promise<Team[]>((resolve, reject) => {
    fetch("https://statsapi.mlb.com/api/v1/teams?sportId=1")
    .then((response) => response.json())
    .then((json) => {
      const { teams } = json;

      let nameAndId = teams.map((team: { id: number, name: string, clubName: string }) => {
        const splitName = team.name.split(" ");

        let codeName = splitName.map((name, index) => {
          let newName = name;

          if(index === 0) {
            newName = name.toLowerCase()
          }

          return newName;
        }).join("").replace(/\./, "");

        return { id: team.id, name: team.name, codeName, clubName: team.clubName };
      });

      resolve(nameAndId);
    })
    .catch((e) => reject(e))
  })
}

const getLastPostseasonGame = (season: number, teamId: number) => {
  return new Promise((resolve, reject) => {
    fetch(`https://statsapi.mlb.com/api/v1/schedule/postseason?season=${season}`)
      .then((response) => response.json())
      .then((json) => {
        const { dates } = json;

        // @ts-ignore
        let postSeasonGames = dates.map((date) => {
            return date.games
            // @ts-ignore
              .map((game) => {
                if (
                  game.teams.away.team.id === teamId ||
                  game.teams.home.team.id === teamId
                ) {
                  return game;
                }
              })
              // @ts-ignore
              .filter((game) => game);
          })
          // @ts-ignore
          .filter((date) => date.length > 0);

        if (postSeasonGames.length > 0) {
          const games = postSeasonGames[postSeasonGames.length - 1];

          resolve(games[games.length - 1]);
        } else {
          reject(`This team did not make the post season in ${season}`);
        }
      })
      .catch((e) => reject(e));
  });
};

const getLastRegularSeasonGame = (teamId: number) => {
  return new Promise((resolve, reject) => {
    fetch(`https://statsapi.mlb.com/api/v1/teams?teamId=${teamId}&hydrate=previousSchedule`)
      .then((response) => response.json())
      .then((json) => {
        const { dates } = json.teams[0].previousGameSchedule;
        const games = dates[dates.length - 1].games;

        resolve(games[games.length - 1]);
      })
      .catch((e) => reject(e));
  });
};

const getLastGameId = (season: number, teamId: number) => {
  return new Promise((resolve, reject) => {
    getLastPostseasonGame(season, teamId)
      // @ts-ignore
      .then((response) => resolve(response.gamePk))
      .catch(() => {
        getLastRegularSeasonGame(teamId)
          // @ts-ignore
          .then((response) => resolve(response.gamePk))
          .catch((e) => reject(e));
      });
  });
};

const getLastPlayEndTime = (season: number, teamId: number) => {
  return new Promise<string>((resolve, reject) => {
    getLastGameId(season, teamId)
    .then((gameId) => fetch(`https://statsapi.mlb.com/api/v1.1/game/${gameId}/feed/live`))
    .then((response) => response.json())
    .then((json) => {
      const { allPlays } = json.liveData.plays;
      resolve(allPlays[allPlays.length -1].playEndTime);
    })
    .catch((e) => reject(e))
  })
}

const calculateSolstice = (last: Date, first: Date) => {
  const lastPlay = last.valueOf();
  const firstPlay = first.valueOf();
  const today = new Date().valueOf();

  const solsticeDiff = firstPlay - lastPlay;
  const todayDiff = firstPlay - today;

  return {
    currentPosition: todayDiff / solsticeDiff,
    firstSolstice: new Date(Math.floor(lastPlay + ((firstPlay - lastPlay) * .25))),
    secondSolstice: new Date(Math.floor(lastPlay + ((firstPlay - lastPlay) * .5))),
    thirdSolstice: new Date(Math.floor(lastPlay + ((firstPlay - lastPlay) * .75)))
  }
}

const initSolstice = async (season: number) => {
  const teams = await getMLBTeams();

  return Promise.all(
    teams.map(async (team) => {
      const { id, name } = team;
      const nextPlayTime = getOpeningDay(name);
      const lastPlayTime = new Date(await getLastPlayEndTime(season, id));
      const positions = nextPlayTime ? calculateSolstice(lastPlayTime, new Date(nextPlayTime.firstPlay)) : false;

      return {
        ...team,
        nextPlayTime,
        lastPlayTime,
        positions
      } as Solstice
    })
  );
}

export default initSolstice;