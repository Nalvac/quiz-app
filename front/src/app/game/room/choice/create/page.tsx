'use client';
import styles from "../../../../pages.module.scss"
import {Select, SelectOption} from "@/app/_.components/MultiSelect/page";
import React, {useEffect, useState} from "react";
import {useUser} from "@/context/userContext";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {GameRoom} from 'gameinterface/models';
import Link from "next/link";

export default function RoomChoice() {

  const themes: SelectOption[] = [
    {label: "Science", value: 1},
    {label: "Culture générale", value: 2},
    {label: "Sport", value: 3},
    {label: "Histoire", value: 4},
    {label: "Technologie", value: 5},
  ];

  const difficulties: SelectOption[] = [
    {label: 'Facile', value: 1},
    {label: 'Moyen', value: 2},
    {label: 'Difficile', value: 3},
  ]

  const [difficulty, setDifficulty] = useState<SelectOption | undefined>(difficulties[0]);
  const [themeChoice, setThemeChoice] = useState('choiceTheme');
  const [roomConfig, setRoomConfig] = useState<GameRoom>();
  const [theme, setTheme] = useState<SelectOption[]>([themes[0]]);
  const [toggleThemeFiled, setToggleThemeFiled] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>('');
  const [roomPassWord, setRoomPassWord] = useState<string>('');
  const {socket, userContextName} = useUser();
  const router = useRouter();

  useEffect(() => {

    if (themeChoice === 'random') {
      handleRandomTheme();
      setToggleThemeFiled((x) => true);
    } else {

      setToggleThemeFiled((x) => false);
    }


  }, [themeChoice]);
  const handleThemeChoice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThemeChoice(event.target.value);
  };

  const getRandomThemes = (themes: SelectOption[]) => {
    const availableThemes = [...themes];
    const randomThemes = [];

    for (let i = 0; i < 3 && availableThemes.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availableThemes.length);
      const randomTheme = availableThemes.splice(randomIndex, 1)[0];
      randomThemes.push(randomTheme);
    }

    return randomThemes;
  };

  const handleRoomConfig = () => {
    const roomConfig: GameRoom = {
      theme: theme.map(t => t.label),
      isPrivate: true,
      difficultyLevels: difficulty ? difficulty.label : '',
      randomTheme: toggleThemeFiled,
      name: roomName,
      password: roomPassWord
    };

    socket.emit('createRoom', roomConfig);
    socket.on('roomCreated', (message: string) => {
      console.log(message);
      toast.success(`${message}`);
      router.push('/game/room/choice/join')
    });
    setRoomConfig(roomConfig);
  };

  const handleRandomTheme = () => {
    const randomThemes = getRandomThemes(themes);
    setTheme(randomThemes);
  };

  return (
    <div className={`d-flex flex-column justify-content-center align-items-center ${styles.appContainer}`}>
      <form className={`d-flex flex-column card p-30  ${styles.recipeForm}`}>
        <div className={`p-4 bg-white w-800 rounded`}>
          <h2 className="text-2xl font-bold mb-4">Création dune Salle privée</h2>

          <div className="flex items-center space-x-4 mb-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-500"
                name="themeChoice"
                value="choiceTheme"
                checked={themeChoice === 'choiceTheme'}
                onChange={handleThemeChoice}
              />
              <span className="ml-2">Choisir mon theme</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-500"
                name="themeChoice"
                value="random"
                checked={themeChoice === 'random'}
                onChange={handleThemeChoice}
              />
              <span className="ml-2">Aléatoire</span>
            </label>
          </div>

          {/* Sélection de Thèmes */}
          <div className="mb-4">
            <label className="block mb-2">Sélectionner un ou plusieurs thème(s) :</label>
            <Select
              multiple
              options={themes}
              value={theme}
              disable={toggleThemeFiled}
              onChange={o => setTheme(o)}
            />
          </div>

          {/* Niveaux de Difficulté */}
          <div className="mb-4">
            <label className="block mb-2">Sélectionner le niveau de difficulté :</label>
            <Select options={difficulties} value={difficulty} onChange={o => setDifficulty(o)}/>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Le nom de la salle :</label>
            <input className={'w-full'} placeholder={'Nom de la salle '} onChange={(e) => setRoomName(e.target.value)}/>
          </div>


          <div className="mb-4">
            <label className="block mb-2">Mot de passe de la salle :</label>
            <input className={'w-full'} placeholder={'Mot de passe '}
                   onChange={(e) => setRoomPassWord(e.target.value)}/>
          </div>

          <div className={`p-2 d-flex justify-center align-items-center`}>
            <button
              className="btn-primary px-4 py-2 rounded"
              onClick={(e) => {e.preventDefault(); handleRoomConfig()}}
            >
              Sauvegarder
            </button>
          </div>
        </div>
        <span className={'d-flex justify-center align-items-center'}>Voulez vous vous connecté à une salle privé ?
          <Link className={'text-blue-500'} href='/game/room/choice/join'> Cliquez ici</Link>
        </span>
      </form>
    </div>
  )
}
