import { Box, Flex, HStack, Text, Button, Icon } from '@chakra-ui/react';
import React from 'react';
import AvatarComponent from '../../atoms/avatar';

import { IoIosCloseCircle } from "react-icons/io";
import { ChatContext } from '../../../Contexts/chatContext';


type Props = {
  data: any
}

const HeaderChatBox: React.FC<Props> = ({ data }) => {

  const { handleCloseChatBox } = React.useContext(ChatContext)

  function getStatusName(status: number) {
    switch (status) {
      case 0:
        return 'offline';
        break;

      case 1:
        return 'online';
        break;

      case 2:
        return 'ausente';
        break;

      default:
        break;
    }
  }

  function getStatusColor(status: number) {
    switch (status) {
      case 0:
        return '#a8a8b3';
        break;

      case 1:
        return '#2fbb49';
        break;

      case 2:
        return '#f1d923';
        break;

      default:
        break;
    }
  }


  return (
    <HStack h='80px' w='100%' bg='var(--white)' p='5' >
      <Flex align='center' w='70%' >
        <AvatarComponent size='md' name={data?.name} src={data?.avatar} colorScheme='transparent' border={getStatusColor(data?.status)} />
        <Flex direction='column' marginLeft='2'>
          <Text fontSize='xl'>{data?.name}</Text>
          <Text>{getStatusName(data?.status)}</Text>
        </Flex>
      </Flex>

      <Flex justify='flex-end' w='30%'>
        <Button onClick={handleCloseChatBox} colorScheme='transparent' sx={{ p: 0 }}>
          <Icon color='var(--black)' as={IoIosCloseCircle} fontSize='25' />
        </Button>
      </Flex>
    </HStack>
  );
}

export default HeaderChatBox;