import { useEffect, useState } from 'react'
import classes from './App.module.css';
import Header from './components/Header';
import Diamond from './components/Diamond';
import type { Solstice } from './js/solstice.d';
import initSolstice from './js/solstice';

interface UiSolstice extends Solstice {
  showTeam: boolean
}

function App() {
  const [teams, setTeams] = useState<UiSolstice[]>([])
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValue = (event: { target: { value: string; }; }) => {
    const { value } = event.target;
    setSearchValue(value);

    let lowercaseValue = value;

    const updateTeam = teams.filter((team) => {
      let lowercaseName = team.name.toLowerCase();

      return lowercaseName.includes(lowercaseValue)
    });

    if(updateTeam.length === 1) {
      const [ chosenTeam ] = updateTeam;

      setTeams(teams.map((team) => {
        if(chosenTeam.name === team.name) {
          team.showTeam = true;
        }
        else {
          team.showTeam = false;
        }

        return team;
      }))
    }
  };

  useEffect(() => {
    initSolstice(2024)
    .then((teams) => {
      console.log(teams);
      let uiReadyTeams = teams.map((team) => {
        return { ...team, showTeam: false}
      })

      setTeams(uiReadyTeams)})
    .catch((e) => console.error(e));
  }, []);

  return (
    <div className={classes.wrapper}>
      <Header />
      
      <input type="text" value={searchValue} onChange={handleSearchValue} />

      {teams.length > 0 &&
        teams.map((team) => {
          if(team.showTeam) {
            return (
                <Diamond key={`diamond-${team.id}`} solstice={team}/>
            )
          }
        })
      }
      <div>
        <h2>What is the Offseason Baseball Solstice?</h2>
        <p>During the regular season, there are certain markers that let you know where you are, like the All-Star Break and the trading deadline.  However, during the off-season, there are no such markers, it's just a cold winter and maybe a countdown until opening day.  The Offseason Baseball Solstice chart helps you visiualise how far into the offseason you are.</p>
      </div>
    </div>
  )
}

export default App
