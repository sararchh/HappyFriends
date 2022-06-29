import { createContext, ReactNode, useEffect, useState } from "react";
import { firebase, db } from "../services/firebase";
import { doc, getDocs, collection, query, where, startAt, orderBy, endAt } from 'firebase/firestore';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

type UserContextType = {
  loading: boolean;
  usersList: any;
  setUsersList: any;
  handleSearchUser: (parBusca: string) => void;
}

type UserContextProviderProps = {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextType);

export function UserContextProvider(props: UserContextProviderProps) {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [usersList, setUsersList] = useState<any>([]);

  async function handleSearchUser(parBusca: string) {
    try {
      setLoading(true);
      const response = await getDocs(
        query(
          collection(db, 'users'),
          orderBy('name', 'asc'),
          startAt(parBusca),
          // endAt(parBusca.toLowerCase() + '\uf8ff')
        )
      );
      // console.log('response', response?.docs);
      const docs = response.docs;
      const list: any = [];

      docs.map((item) => {
        // console.log('items',item.data());
        list.push(item.data());
      })
      setUsersList(list)

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);

    }
  }


  return (
    <UserContext.Provider
      value={{
        loading,
        handleSearchUser,
        usersList,
        setUsersList
      }}>

      {props.children}
    </UserContext.Provider>
  );
}