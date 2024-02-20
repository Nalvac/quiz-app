'use client';


import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import React, {useState} from "react";
import {useUser} from "@/context/userContext";
import {io} from "socket.io-client";
export default function Home() {
  const [username, setUsername] = useState('');
  const { setUserContextName, socketId, setSocketId, setSocket } = useUser();
  const router = useRouter();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setUserContextName(event.target.value);
  };

  const handleChatRedirect = () => {
    const socket = io('http://localhost:4000');
    socket.on('connect', () => {
      const socketId = socket.id ?  socket.id : '';
      setSocketId(socketId);
      setSocket(socket);
      router.push('/game');
      toast.success(`Bienvenue ${username} ! Prêt pour une nouvelle discussion ?`);
    });

    socket.on('clientId', (clientId: string) => {
      console.log('Received clientId:', clientId);
    });
  };


  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="max-w-4xl px-6 py-16 mx-auto text-center">
        <h1 className="text-lg font-extrabold leading-none text-white md:text-5xl lg:text-6xl">Bienvenue sur votre App challenge avec OpenAi</h1>
        <input
          type="text"
          placeholder="Nom d'utilisateur..."
          value={username}
          onChange={handleUsernameChange}
          className="text-black my-8 p-3 border rounded-md w-2/6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={(e) => {e.preventDefault(); handleChatRedirect()}}
                className="inline-block ml-5 mt-8 px-6 py-3 text-lg font-medium text-white bg-primary rounded-lg ">Entrer</button>
      </div>
    </div>
  );
}
