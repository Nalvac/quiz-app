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

  useEffect(() => {
    if (!userContextName) {
      router.push('/');
      return;
    };

  }, []);


  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      <div className="flex-fill">
          <h1 className={`font-bold text-2xl`}>Quiz App</h1>
      </div>
      <div className={`d-flex justify-center align-items-center ${styles.headerList}`}>
        <p className={'p-4'}>{userContextName}</p>
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
