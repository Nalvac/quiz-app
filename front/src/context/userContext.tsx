// eslint-disable
'use client'
import React, {createContext, ReactNode, useContext, useState} from "react";


interface ContextProps {
  userContextName: string
  setUserContextName: (value: string) => void
}
interface UserContextProviderProps {
  children: ReactNode;
}

const userContext = createContext<ContextProps>({userContextName: '', setUserContextName: value => 'dgsrgd'});

export const UserContextProvider: React.FC<UserContextProviderProps>  = ({children}) => {
  const [userContextName, setUserContextName] = useState('');

  return (
    <userContext.Provider value={{ userContextName, setUserContextName }}>
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
