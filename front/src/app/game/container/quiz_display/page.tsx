'use client';
import React, {useEffect, useState} from 'react';
import SuggestedAnswerDisplay from "@/app/_.components/SuggestedAnswer/page";
import Header from "@/app/_.components/Header/Header";
import Footer from "@/app/_.components/Footer/Footer";
import {inspect} from "util";
import styles from "../../../pages.module.scss"
import {useUser} from "@/context/userContext";
export default function Quiz() {
  const { socket, isAdmin, userContextName } = useUser();

  useEffect(() => {
    console.log(isAdmin);
  }, [])
	return(
			<>

        <div className={`d-flex flex-column ${styles.appContainer}`}>
          <Header/>
          <div className='d-flex flex-column flex-fill'>
            <div className={`d-flex justify-content-center align-items-center flex-column flex-fill`}>
              <div className={` w-800 h-50`}>
                <h1 className={`text-center text-2xl text-white p-30`}>
                  Affichage de la question
                </h1>
                <SuggestedAnswerDisplay/>
              </div>
            </div>
          </div>
          <Footer/>
        </div>
			</>
	)
}
