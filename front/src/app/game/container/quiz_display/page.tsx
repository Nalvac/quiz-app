'use client';
import React, {useEffect, useState} from 'react';
import SuggestedAnswerDisplay from "@/app/_.components/SuggestedAnswer/page";
import Header from "@/app/_.components/Header/Header";
import Footer from "@/app/_.components/Footer/Footer";
import styles from "../../../pages.module.scss"
import {useUser} from "@/context/userContext";

import { useRouter } from "next/navigation";
export default function Quiz() {
  const router = useRouter();
  const { socket, isAdmin, userContextName, roomId } = useUser();

  useEffect(() => {
    if(!userContextName) {
      router.push('/');
      return;
    }else if (!roomId) {
      router.push('/game/room/choice/join')
    }
  }, [])
	return(
			<>
        <div className={`d-flex justify-content-center align-items-center flex-column flex-fill`}>
          <div className={` w-800 h-50`}>
            <h1 className={`text-center text-2xl text-white p-30`}>
              Affichage de la question
            </h1>
            <SuggestedAnswerDisplay/>
          </div>
        </div>
			</>
	)
}
