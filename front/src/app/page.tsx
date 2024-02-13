'use client';

import { useRouter } from 'next/navigation';
import React, {useState} from "react";
import styles from  "./pages.module.scss"
export default function Home() {
    const [username, setUsername] = useState('');
    const router = useRouter();

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };


    return (
        <div className={`d-flex flex-column justify-content-center align-items-center ${styles.appContainer}`}>
           <div>
               <div className="card p-20 w-800 d-flex flex-column justify-content-center align-items-center">

                   <h1>Bienvenue sur quizz challenge</h1>

                   <p style={{textAlign: `center`}}>
                       Découvrez le futur du quiz avec le Défi Quiz à Thème Personnalisé Dynamique. Choisissez
                       vos sujets, ajustez la difficulté, et plongez dans des sessions multijoueurs en temps réel. Sécurité avancée, performances rapides, plaisir instantané. Défiez-vous, grimpez dans les classements, rejoignez une communauté passionnante. Prêt pour le défi ?
                   </p>

                   <div className="w-300 mt-25 d-flex space-between">
                       <a className="btn large btn-reverse-primary" href='/roomChoice'>Salle Privé</a>
                       <a className="btn large btn-reverse-primary" href='/roomChoice/joinRoom'>Salle Public</a>
                   </div>
               </div>
           </div>
        </div>
    );
}
