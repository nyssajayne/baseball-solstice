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
    <div className={showTeam ? `${classes.cardWrapper} ${classes.showTeam} ${classes[showTeam.codeName]}` : `${classes.cardWrapper}`}>
      <div className={classes.card}>
        <div className={`${classes.innerCard} ${classes.sideOne}`}>
          <div className={classes.logoWrapper}>
            <Logo />
          </div>
          <h1 className={classes.h1}>Offseason Baseball Solstice Schedule</h1>
          <div className={classes.h2Wrapper}>
            <h2 className={classes.h2}>Are you closer to your last game of baseball or your next game of baseball this off-season?<br />
                 Search for your team and find out!</h2>
          </div>

          <Select 
            className={classes.select}
            isClearable={true} 
            menuPlacement='top'
            onChange={handleSearchValue}
            options={selectOptions}
            // menuIsOpen={true}
          />
        </div>
      </div>
      <div className={classes.card}>
        <div className={`${classes.innerCard} ${classes.sideTwo}`}>
          <div className={classes.headerWrapper}>
            <div className={classes.logoWrapper}>
              <Logo />
            </div>
            <div className={classes.titleWrapper}>
              <h1 className={classes.h1}>Offseason Baseball Solstice Schedule</h1>
            </div>
          </div>
          {showTeam && <Diamond key={`diamond-${showTeam.id}`} solstice={showTeam}/>}
          <button className={classes.clearTeam} onClick={() => setShowTeam(undefined)}>See Another Team</button>
        </div>
      </div>
    </div>
    //   {showTeam && <Diamond key={`diamond-${showTeam.id}`} solstice={showTeam}/>}

    //   <div className={showTeam ? `${classes.showTeam} ${classes.explainer}` : `${classes.explainer}`}>
    //     <h2>What is the Offseason Baseball Solstice?</h2>
    //     <p>During the regular season, there are certain markers that let you know where you are, like the All-Star Break and the trading deadline.  However, during the off-season, there are no such markers, it's just a cold winter and maybe a countdown until opening day.  The Offseason Baseball Solstice chart helps you visiualise how far into the offseason you are.</p>
    //   </div>
    // </div>
  )
}

export default App
