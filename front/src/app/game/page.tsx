'use client';

import React, {useEffect} from "react";
import styles from "../pages.module.scss"
import {useUser} from "@/context/userContext";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function Game() {
  const {socket, userContextName} = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!userContextName) {
      router?.push('/');
      return;
    }
  }, []);

  return (
    <div className={`d-flex flex-column justify-content-center align-items-center ${styles.appContainer}`}>
      <div>
        <div className="card p-20 w-800 d-flex flex-column justify-content-center align-items-center">

          <h1>Bienvenue sur quizz challenge</h1>

          <p style={{textAlign: `center`}}>
            Découvrez le futur du quiz avec le Défi Quiz à Thème Personnalisé Dynamique. Choisissez
            vos sujets, ajustez la difficulté, et plongez dans des sessions multijoueurs en temps réel.
            Sécurité avancée, performances rapides, plaisir instantané. Défiez-vous, grimpez dans les
            classements, rejoignez une communauté passionnante. Prêt pour le défi ?
          </p>

          <div className="w-300 mt-25 d-flex space-between">
            <Link className="btn large btn-reverse-primary" href='/game/room/choice/join'>Salle Privé</Link>
            <Link className="btn large btn-reverse-primary" href='/game'>Salle Public</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

