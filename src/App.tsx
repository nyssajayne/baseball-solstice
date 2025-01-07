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
  const [about, setAbout] = useState("hideAbout");

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

  function handleNavValue() {
    setAbout(about === "hideAbout" ? "showAbout" : "hideAbout");
  }

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
    <div className={showTeam ? `${classes.wrapper} ${classes[about]} ${classes.showTeam} ${classes[showTeam.codeName]}` : `${classes.wrapper} ${classes[about]}`}>
    <nav><button onClick={handleNavValue}>About the Schedule</button></nav>
    <div className={classes.cardWrapper}>
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
          />
        </div>
      </div>
      <div className={classes.card}>
        <div className={`${classes.innerCard} ${classes.about}`}>
          <div className={classes.copy}>
            <h2>About the Offseason Baseball Solstice Schedule</h2>
            <p>Are you staring out the window and waiting for spring? Do you find yourself dreaming of green grass, warm sunshine, and the crack of the bat? We get it. That's why we created the Offseason Baseball Solstice Schedule! Find out exactly how long it is until you can trade your winter coat for a jersey and head to the ballpark. Join us on the celestial base path as we race through the winter towards a head-first slide into Opening Day.</p>
            <p>&nbsp;</p>
            <p>While this is a Javascript project, many thanks to Tood Roberts and the documentation contained in his <a href="https://github.com/toddrob99/MLB-StatsAPI" target="/_blank">MLB-StatsAPI</a> repo.  A real home-run.</p>
            <p>&nbsp;</p>
            <p>* An assumption has been made that the first pitch on Opening Day will be thrown at 1:10pm local time of where the game will be played.</p>
          </div>
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
          <button className={classes.clearTeam} onClick={() => setShowTeam(undefined)}><span>See Another Team</span></button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default App
