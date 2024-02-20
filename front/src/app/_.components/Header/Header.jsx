'use client';

import styles from "./Header.module.scss"
import {useEffect, useRef, useState} from "react";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu.jsx";
import {useUser} from "@/context/userContext";
import { useRouter } from 'next/navigation';

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [clientsCount, setClientsCount] = useState(0);
  const { socket, userContextName } = useUser();
  const router = useRouter();
  const socketRef = useRef(socket);

  useEffect(() => {
    if (!userContextName) {
      router.push('/');
      return;
    };

    socketRef.current.on('roomJoined', (mes) => {setClientsCount((x) => x = mes.clientsCount)});

    const handleRoomJoined = (mes) => {
      console.log(mes.clientsCount);
      setClientsCount(mes.clientsCount);
    };

    socketRef.current.off('roomJoined', (mes) => {setClientsCount((x) => x = mes.clientsCount)});

    return () => {
      socketRef.current.off('roomJoined', handleRoomJoined);
    };
  }, [userContextName, router, clientsCount]);


  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      <div className="flex-fill">
          <h1 className={`font-bold text-2xl`}>Quiz App</h1>
      </div>
      <div className={`d-flex justify-center align-items-center ${styles.headerList}`}>
        <p className={'p-4'}>{clientsCount} joueurs connecté</p>
      </div>
      <i onClick={() => setShowMenu(true)} className={`fa-solid fa-bars mr-15  ${styles.headerXs}`}></i>
      {showMenu &&
        <>
          <div onClick={() => setShowMenu(false)} className="calc"></div>
         <HeaderMenu />
        </>
      }
    </header>
  )
}
