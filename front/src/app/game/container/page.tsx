'use client'

import Header from "@/app/_.components/Header/Header";
import Footer from "@/app/_.components/Footer/Footer";
import styles from  "../../pages.module.scss"
import {useUser} from "@/context/userContext";
import { useRouter } from "next/navigation";
import {useEffect, useState} from "react";
import SuggestedAnswerDisplay from "@/app/_.components/SuggestedAnswer/page";
export default function Game() {
  const router = useRouter();
  const { socket, isAdmin, userContextName, roomId,clientCount,setIsAdmin, setClientCount } = useUser();
  const [isStarted, setIsStarted] = useState(false)
  const [questions, setQuestions] = useState<any[]>([])


  socket.on('clientCount', (data: { clientsCount: number}) => {
    setClientCount(data.clientsCount)
  });

  socket.on('gameStarted', (data: { isStarted: boolean; questions: any[] }) => {
    console.log(data);
    setIsStarted(data.isStarted);
    setQuestions(data.questions);
  });

  const handleStartGame = (roomId: string | null) => {
    socket.emit('startGame', { roomId });
  };

  useEffect(() => {
    if (!userContextName) {
      router?.push('/');
      return;
    }
  }, []);
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <div className='d-flex justify-content-center align-items-center flex-column flex-fill'>
        {isAdmin ? (
          <>
            {!isStarted && <button className={'btn-primary p-3 rounded mt-5'} onClick={() => handleStartGame(roomId)}>Lancer le jeu</button> }
            <p className={'p-2 text-x italic p-2 rounded bg-primary'}>{clientCount} joueurs dans la salle</p>
          </>
        ) : (
          <>
            {!isStarted && <p className={'text-white flex justify-center text-xl p-3'}>Attendez que l'administrateur lance la partie...</p>}
          </>
        )}
        {isStarted &&  <SuggestedAnswerDisplay   questions={questions}/> }
      </div>
      <Footer />
    </div>
  );
}

