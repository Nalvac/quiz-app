'use client'

import Header from "@/app/_.components/Header/Header";
import Footer from "@/app/_.components/Footer/Footer";
import styles from  "../../pages.module.scss"
import {useUser} from "@/context/userContext";
import { useRouter } from "next/navigation";
import {useEffect, useState} from "react";
import SuggestedAnswerDisplay from "@/app/_.components/SuggestedAnswer/page";
import {QuestionGen, Winner} from 'gameinterface/models'
import {LoadingQuiz} from "@/app/_.components/LoadingQuiz/LoadingQuiz";
export default function Game() {
  const router = useRouter();
  const { socket, isAdmin, userContextName, roomId,clientCount, setClientCount } = useUser();
  const [isStarted, setIsStarted] = useState(false);
  const [questions, setQuestions] = useState<QuestionGen[]>([]);
  const [showSpinner, setSpinner] = useState<boolean>(false);
  const [winner, setWinner] = useState<Winner | null>(null);

  socket.on('clientCount', (data: { clientsCount: number}) => {
    setClientCount(data.clientsCount)
  });

  socket.on('gameStarted', (data: { isStarted: boolean; questions: any[] }) => {
    setIsStarted(data.isStarted);
    setQuestions(data.questions);
  });


  socket.on('gameResult', (data: { winner: Winner }) => {
    setSpinner(false);
    setWinner(data.winner);
  });

  const handleGameEnd = (score: number, playerName: string) => {
    console.log(`${playerName} a obtenu un score de ${score}`);
    socket.emit("gameEnd", { playerName, score, roomId });
  };

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
        {winner === null && (
          <>
            {isAdmin ? (
              <>
                {!isStarted && (
                  <button className={'btn-primary p-3 rounded mt-5'} onClick={() => handleStartGame(roomId)}>
                    Lancer le jeu
                  </button>
                )}
              </>
            ) : (
              <>
                {!isStarted && (
                  <p className={'text-white flex justify-center text-xl p-3'}>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    Attendez que l'administrateur lance la partie...
                  </p>
                )}
              </>
            )}

            <p className={'p-2 text-x italic p-2 rounded bg-primary mt-2'}>
              Vous êtes {clientCount ? clientCount : 'le premier joueur'} dans la salle
            </p>

            {isStarted && questions && !showSpinner && (
              <SuggestedAnswerDisplay questions={questions} onGameEnd={handleGameEnd} setSpinner={setSpinner}/>
            )}
            {showSpinner &&
              <LoadingQuiz></LoadingQuiz>
            }
          </>
        )}

        <div>
          {winner !== null && (
            <div>
              <p className={'p-2 text-2xl text-white font-bold'} >
                {
                  winner && (
                    winner.clientId != socket.id ? (
                      <p>Le gagnant est {winner.playerName} avec un score de {winner.score} points !</p>
                    ) :
                      (<p>Vous êtes le gagnant avec {winner.score} points !</p>)
                  )
                }
              </p>
            </div>
          )}
        </div>

      </div>
      <Footer />
    </div>
  );
}

