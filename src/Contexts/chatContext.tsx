import React, { createContext, ReactNode } from 'react';
import { AuthContext } from './authContext';

import { firebase, db } from "../services/firebase";
import { collection, addDoc, query, where, getDocs, onSnapshot, doc } from 'firebase/firestore';

type ContactProps = {
  avatar: string,
  email: string,
  name: string,
  uid: string,
}

type ListChatProps = {
  ownerId: string,
  group: boolean,
  users: string[],
  contact: ContactProps
}

type UserProps = {
  avatar: string,
  email: string,
  name: string,
  uid: string,
}

type ChatContextType = {
  createChat: (user: UserProps) => void;
  listChats: any,
  chatSelected: any,
  handleSetListChats: (chats: ListChatProps[]) => void;
  getUserDataById: (id: string) => void;
  handleOpenChatBox: (data: any) => void;
  handleCloseChatBox: () => void;
  sendMessage: (contactData: ContactProps, textMessage: string) => void;
}

type ChatContextProviderProps = {
  children: ReactNode;
}


export const ChatContext = createContext({} as ChatContextType);

export function ChatContextProvider(props: ChatContextProviderProps) {

  const { user: userLogged } = React.useContext(AuthContext);

  const [listChats, setListChats] = React.useState<ListChatProps[]>([]);
  const [chatSelected, setChatSelected] = React.useState<any>(null);

  async function createChat(contactChat: UserProps) {
    // console.log('data', user, userLogged?.id);
    try {
      const values: any = {
        users: [contactChat.uid, userLogged?.uid],
        group: false,
        ownerId: userLogged?.uid,
      }

      const existChat = await hasExistChat(values?.users);

      if (existChat) {
        return;
      }
      const chatCreated = await addDoc(collection(db, 'chats'), values);
      // console.log('chatCreated', chatCreated);

    } catch (error) {
      console.log('error', error);
    }
  }

  async function hasExistChat(arrayIds: string[]) {
    try {
      const script = query(collection(db, 'chats'), where('users', 'in', [[arrayIds[0], arrayIds[1]], [arrayIds[1], arrayIds[0]]]));

      const querySnapshot = await getDocs(script);
      // console.log('snapshot', snapshot);

      if (!querySnapshot?.empty) {
        return querySnapshot?.docs[0]?.data();
      }
      return false;

    } catch (error) {
      // console.log('error', error);
      return false;

    }
  }

  async function getUserDataById(id: any) {

    const script = query(collection(db, 'users'), where('uid', '==', id));

    const querySnapshot = await getDocs(script);

    if (!querySnapshot?.empty) {
      const values = {
        ...querySnapshot?.docs[0]?.data(),
        contactDocId: querySnapshot?.docs[0]?.id
      }

      return values;
    }
    return false;
  }

  async function handleSetListChats(chats: ListChatProps[]) {
    const dataList: any = [];

    for (let index = 0; index < chats.length; index++) {
      const element = chats[index];

      const contactData: any = await getUserDataById(element?.contact);
      dataList.push({
        ...element,
        contact: contactData
      });

    }

    setListChats(dataList);
  }

  function handleOpenChatBox(data: any) {
    // console.log('uid', uid);
    if (chatSelected) {
      if (chatSelected.docId != data.docId){
        handleCloseChatBox();
        setTimeout(() => setChatSelected(data), 200) 
        return;
      }
      return;
    }
    
    setChatSelected(data);
  }

  function handleCloseChatBox() {
    setChatSelected(null);
  }

  async function sendMessage(contactData: ContactProps, textMessage: string) {
    // console.log('contactData', contactData);

    const values = {
      content: textMessage,
      to: contactData.uid,
      nameTo: contactData.name,
      from: userLogged?.uid,
      type: 'text',
      timeStamp: new Date().getTime(),
    };

    const response = await addDoc(collection(db, `chats/${chatSelected?.docId}/messages`), values);
    // console.log('response', response);

  }

  return (
    <ChatContext.Provider
      value={{
        createChat,
        listChats,
        chatSelected,
        handleSetListChats,
        getUserDataById,
        handleOpenChatBox,
        handleCloseChatBox,
        sendMessage
      }}>

      {props.children}
    </ChatContext.Provider>
  );
}



