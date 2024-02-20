'use client'

import Header from "@/app/_.components/Header/Header";
import Footer from "@/app/_.components/Footer/Footer";
import styles from  "../../pages.module.scss"
import Quiz from "@/app/game/container/quiz_display/page";
import {useUser} from "@/context/userContext";

import { useRouter } from "next/navigation";
import {useEffect, useState} from "react";
export default function Game() {
  const router = useRouter();
  const { socket, isAdmin, userContextName, roomId,clientCount,setIsAdmin, setClientCount } = useUser();
  const [isStarted, setIsStarted] = useState(false)


  socket.on('clientCount', (data: { clientsCount: number}) => {
    setClientCount(data.clientsCount)
  })



  const handleStartGame = (roomId: string) => {
    socket.emit('startGame', { roomId });
    socket.on('gameStarted', (data: {isStarted: boolean}) => {
      setIsStarted(data.isStarted)
    })
  };

  useEffect(() => {
    if (!userContextName) {
      router?.push('/');
      return;
    };
  }, [])
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <div className='d-flex justify-content-center align-items-center flex-column flex-fill'>
        {isAdmin ? (
          <>
            {!isStarted && <button className={'btn-primary p-3 rounded mt-5'} onClick={() => handleStartGame('id_de_la_salle')}>Lancer le jeu</button> }
            <p>{clientCount} joueurs dans la salle</p>
          </>
        ) : (
          <>
            <p className={'text-white flex justify-center text-xl p-3'}>Attendez que l'administrateur lance la partie...</p>
          </>
        )}
        {isStarted &&  <Quiz /> }
      </div>
      <Footer />
    </div>
  );
}

