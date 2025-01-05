import { useEffect, useState } from 'react'
import classes from './App.module.css';
import Logo from './components/Logo';
import Diamond from './components/Diamond';
import Select from 'react-select';
import type { Solstice } from './js/solstice.d';
import initSolstice from './js/solstice';

function App() {
  const [teams, setTeams] = useState<Solstice[]>([]);
  const [selectOptions, setSelectOptions] = useState<{ label: string, value: number}[]>();
  const [showTeam, setShowTeam] = useState<Solstice | undefined>()


  const handleSearchValue = (newValue: any, actionMeta: any) => {
    const { action } = actionMeta;

    if(action === "select-option") {
      const { value } = newValue;

      let chosenTeam = teams.find((team) => {
        return team.id === value
      })

      setShowTeam(chosenTeam)
    }
    else if(action === "clear") {
      setShowTeam(undefined);
    }
  };

  useEffect(() => {
    initSolstice(2024)
    .then((teams) => {
      console.log(teams);

      setTeams(teams)

      let optionTeams = teams.map((team) => {
        return { value: team.id, label: team.name}
      })

      setSelectOptions(optionTeams);

    })
    .catch((e) => console.error(e));
  }, []);

  return (
    <div className={showTeam ? `${classes.showTeam} ${classes.wrapper}` : `${classes.wrapper}`}>
      <header>
        <Logo />
        <h1 className={classes.h1}>Offseason Baseball Solstice Calculator</h1>
        <h2  className={classes.h2}>Are you closer to your last game of baseball or your next game of baseball this off-season?<br />
              Search for your team and find out!</h2>
      </header>
      
      <Select options={selectOptions} onChange={handleSearchValue} isClearable={true} />

      {showTeam && <Diamond key={`diamond-${showTeam.id}`} solstice={showTeam}/>}

      <div className={showTeam ? `${classes.showTeam} ${classes.explainer}` : `${classes.explainer}`}>
        <h2>What is the Offseason Baseball Solstice?</h2>
        <p>During the regular season, there are certain markers that let you know where you are, like the All-Star Break and the trading deadline.  However, during the off-season, there are no such markers, it's just a cold winter and maybe a countdown until opening day.  The Offseason Baseball Solstice chart helps you visiualise how far into the offseason you are.</p>
      </div>
    </div>
  )
}

export default App
