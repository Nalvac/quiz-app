'use client';
import React, { useState } from "react";
import styles from "../../../../pages.module.scss";
import { useUser } from "@/context/userContext";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function JoinRoom() {
  const { socket, setIsAdmin, userContextName, setRoomId, setClientCount } = useUser();
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    socket.emit('joinRoom', { roomId: roomName, isPrivate: true, password });
    socket.on('roomJoined', (data: { message: string, clientsCount: number, isAdmin: boolean, roomId: string }) => {
      setIsAdmin(data.isAdmin)
      setRoomId(data.roomId)
      setClientCount(data.clientsCount)
      router.push('/game/container');
    })
  };

  return (
    <div className={`d-flex flex-column justify-content-center align-items-center ${styles.appContainer}`}>
      <form className={`d-flex flex-column card p-30 w-500 ${styles.recipeForm}`} onSubmit={handleSubmit}>
        <h2 className='mb-2'>Rejoindre une salle</h2>
        <div className='d-flex flex-column mt-2'>
          <label className={"block mb-2"} htmlFor='roomName'>Nom de la salle:</label>
          <input type='text' id='roomName' value={roomName} onChange={(e) => setRoomName(e.target.value)} />
        </div>

        <div className='d-flex flex-column mt-2'>
          <label className={"block mb-2"} htmlFor='password'>Mot de passe:</label>
          <input type='text' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="d-flex align-items-center justify-content-center mt-5">
          <button className='btn btn-reverse-primary mt-2' type='submit'>Rejoindre</button>
        </div>
        <span className={'d-flex justify-center align-items-center mt-5'}>Voulez vous creé à une salle privé ?
          <Link className={'text-blue-500'} href='/game/room/choice/create'> Cliquez ici</Link>
        </span>
      </form>
    </div>
  );
}



