import React from 'react';

import { CloseIcon } from '@chakra-ui/icons';
import { useBreakpointValue, Tabs, TabList, Tab } from '@chakra-ui/react';

import { AuthContext } from '../../Contexts/authContext';
import { UserContext } from '../../Contexts/userContext';
import { ChatContext } from '../../Contexts/chatContext';

import BoxUserInfo from '../../components/molecules/boxUserInfo';
import InputComponent from '../../components/atoms/input';
import { CardListComponent } from '../../components/molecules/cardListComponent';
import Thumb from '../../components/atoms/thumb';

import { firebase, db } from "../../services/firebase";
import { collection, addDoc, query, where, getDocs, onSnapshot, doc } from 'firebase/firestore';

import {
  Box,
  Stack,
  Button,
  InputRightElement,
  Text
} from '@chakra-ui/react';

import { Container, ContentLeft, ContentRight, ContentNoData, BottomMenu } from './styles';
import ChatBox from '../../components/organisms/chatBox';

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

const chatsRef = collection(db, 'chats');

const Home: React.FC = () => {
  const timeout = React.useRef<any>();

  const [textInput, setTextInput] = React.useState<string>('');
  const [searchMode, setSearchMode] = React.useState<boolean>(false);

  const { user: userLogged, Logout } = React.useContext(AuthContext);
  const { handleSearchUser, usersList, setUsersList } = React.useContext(UserContext);
  const { listChats, chatSelected, handleSetListChats, createChat, handleOpenChatBox } = React.useContext(ChatContext)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  React.useEffect(() => {

    //onSnapshot serve para observar no firestore alteracoes no banco de forma automtica.
    const chatSubscription = onSnapshot(query(chatsRef, where('users', 'array-contains', userLogged?.uid)), (querySnapshot) => {
      const newList: ListChatProps[] = [];

      querySnapshot?.docs.forEach((element) => {
        // console.log('doc', element);
        let arrayUsers = element?.data()?.users;
        let userContactId = arrayUsers.find((i: any) => i !== userLogged?.uid);

        const values: any = {
          docId: element.id,
          ownerId: element?.data()?.ownerId,
          group: element?.data()?.group,
          users: element?.data()?.users,
          contact: userContactId,
        };

        newList.push(values);

      })

      handleSetListChats(newList);
    })


    // return é a desmontagem do componente, conhecido como unmount
    return () => {
      chatSubscription(); //Para de observar mudancas no firestore.
    }

  }, [])



  function handleInput(value: string) {
    setTextInput(value);
    //debounce usa timeout para detectar quando o usuario para de digitar
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      if (textInput.length >= 2) {
        setSearchMode(true);
        handleSearchUser(value);
      } else {
        setSearchMode(false);
      }
    }, 1200)
  }


  function cancelSearch() {
    setTextInput('');
    setSearchMode(false);
    setUsersList([]);

  }

  function handleCreateChat(data: any) {
    createChat(data);
    cancelSearch();
  }

  return (
    <>
      <Container>
        {isWideVersion && (
          <>
            <ContentLeft>
              <div style={{ maxHeight: 250 }}>
                <BoxUserInfo />

                <Box mt={1} mb={4} w='100%'>
                  <Stack direction='row' align='center' justify="center" p={3}>
                    <InputComponent
                      type="text"
                      value={textInput}
                      variant='flushed'
                      placeholder='Faça uma busca'
                      size='sm'
                      onChange={(value) => handleInput(value)}
                      rightElement={searchMode &&
                        <InputRightElement width="15px">
                          <Button h='1.75rem' size='sm' colorScheme='#ffffff00' onClick={cancelSearch}>
                            <CloseIcon w={3} h={3} color='#282828' />
                          </Button>
                        </InputRightElement>
                      }
                    />
                  </Stack>
                </Box>
              </div>

              {/* MODO LISTAGEM */}
              {!searchMode && (
                <Box p={5} mt={1} minHeight={100} mb={4} w='100%'>
                  <Stack direction={'column'} className="list-searched">
                    {listChats.map((chat: any, key: number) => (
                      <CardListComponent
                        data={{
                          uid: chat?.contact.uid,
                          avatar: chat?.contact.avatar,
                          name: chat?.contact.name,
                          email: chat?.contact.email,
                          docId: chat?.docId,
                          contactDocId: chat?.contact.contactDocId,
                        }}
                        onClick={(data) => handleOpenChatBox(data)}
                      />
                    ))}
                  </Stack>
                </Box>
              )}

              {/* MODO BUSCA */}
              {searchMode && (
                <Box p={5} mt={1} minHeight={100} mb={4} w='100%'>
                  <Text fontSize="sm" mb={5} style={{ fontStyle: 'italic' }} >Resultados:</Text>
                  <Stack direction={'column'} className="list-searched">
                    {usersList.filter((i: any) => i.uid !== userLogged?.uid).map((user: any) => (
                      <CardListComponent data={user} onClick={handleCreateChat} />
                    ))}
                  </Stack>
                </Box>
              )}

            </ContentLeft>
          </>
        )}

        <ContentRight>
          <ContentNoData>

            {!chatSelected && (
              <Thumb alt='art-social-interaction-two-people' src='/assets/social.svg' width={500} height={500} />
            )}

            {chatSelected && (
              <ChatBox />
            )}

          </ContentNoData>
        </ContentRight>

      <BottomMenu>
        <Tabs>
          <TabList>
            <Tab>Contato</Tab>
            <Tab>Mensagens</Tab>
          </TabList>
        </Tabs>
      </BottomMenu>
      </Container>

    </>
  )
}

export default Home;

