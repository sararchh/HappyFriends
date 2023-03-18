import React from 'react';

import { ChatContext } from '../../../Contexts/chatContext';

import { db } from "../../../services/firebase";
import { collection, onSnapshot, doc } from 'firebase/firestore';
import HeaderChatBox from '../../molecules/headerChatBox';

import { Flex, HStack, VStack, Icon, Button } from '@chakra-ui/react';

import { RiSendPlaneFill } from 'react-icons/ri';

import InputComponent from '../../atoms/input';
import MessageBox from '../../atoms/messageBox';

const ChatBox: React.FC = () => {

  const boxMessageRef = React.useRef() as any;

  const [chatData, setChatData] = React.useState<any>(null);
  const [messages, setMessages] = React.useState<any>([]);
  const [contactData, setContactData] = React.useState<any>(null);
  const [textMessage, setTextMessage] = React.useState<any>('');

  const { chatSelected, sendMessage } = React.useContext(ChatContext);

  React.useEffect(() => {
    const messagesSubscription = onSnapshot(collection(db, `chats/${chatSelected?.docId}/messages`), (querySnapshot) => {
      const newList: any = [];
      querySnapshot.docs.forEach(doc => {

        // console.log('doc', doc.data());
        newList.push(doc.data())
      });

      setMessages(newList);
    });

    const contactSubscription = onSnapshot(doc(db, 'users', chatSelected?.contactDocId), (doc) => {
      // console.log('query', doc.data());
      setContactData(doc.data());

    });

    return () => {
      messagesSubscription();
      contactSubscription();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // function scrollToBottom() {
  //   boxMessageRef.current.scroll({ bottom: 0 });
  // }


  function handleSendMessage(e: any) {
    e.preventDefault();
    if (textMessage == '') return;
    // console.log('text', textMessage);
    sendMessage(contactData, textMessage);
    setTextMessage('');
    // scrollToBottom();
  }

  return (
    <VStack w='100%'>
      <HeaderChatBox data={contactData} />

      <Flex ref={boxMessageRef} direction='column' w='100%' h={['calc(100vh - 240px)', 'calc(100vh - 240px)', 'calc(100vh - 180px)']} p={5} style={{ overflow: 'auto', overflowY: 'scroll' }}>
        {messages && messages.sort((a: any, b: any) => a.timeStamp - b.timeStamp).map((message: any, key: number) => (
          <MessageBox key={key} data={message} />
        ))}
      </Flex>

      <Flex as='form' onSubmit={handleSendMessage} h='100px' w='100%' bg='var(--white)' p='1' align='center' >
        <HStack w='100%'>
          <Flex w='90%' pl='5'>
            <InputComponent
              type='text'
              value={textMessage}
              variant='flushed'
              placeholder='Digite uma mensagem'
              size='lg'
              onChange={(value) => setTextMessage(value)}
            />
          </Flex>
          <Flex w='10%'>
            <Button type='submit'>
              <Icon as={RiSendPlaneFill} color='var(--primary)' w='20' h='8' />
            </Button>
          </Flex>
        </HStack>
      </Flex>
    </VStack>
  )
}

export default ChatBox;