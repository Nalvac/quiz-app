// eslint-disable
'use client'
import {createContext, useContext, useEffect, useState} from "react";
import {Socket} from "socket.io-client";
import {DefaultEventsMap} from "@socket.io/component-emitter";


interface ContextProps {
  userContextName: string
  setUserContextName: (value: string) => void
  socketId: string | null
  isAdmin: boolean | null,
  setIsAdmin: (value: boolean) => void,
  setSocketId: (value: string) => void,
  socket:  Socket<DefaultEventsMap, DefaultEventsMap>,
  setSocket: (value: Socket) => void,
  roomId: string | null,
  setRoomId: (value: string) => void,
}

const userContext = createContext<ContextProps>({
  userContextName: '',
  setUserContextName: value => 'dgsrgd',
  socketId: null,
  setSocketId: value => '',
  socket: {} as Socket<DefaultEventsMap, DefaultEventsMap>,
  setSocket: value => {},
  isAdmin: false,
  setIsAdmin: value => {},
  setRoomId: value => {},
  roomId: ''
});

// @ts-ignore
export const UserContextProvider = ({children}) => {
  const [userContextName, setUserContextName] = useState('');
  const [socketId, setSocketId] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(false);
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>({} as Socket<DefaultEventsMap, DefaultEventsMap>);

  useEffect(() => {console.log(userContextName)}, [userContextName])

  return (
    <userContext.Provider value={{ userContextName, setUserContextName, socketId, setSocketId,socket, setSocket, isAdmin, setIsAdmin, setRoomId, roomId  }}>
      {children}
    </userContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};


