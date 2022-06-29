import React from 'react';

import { format, utcToZonedTime } from 'date-fns-tz';

import { Box, Flex, Text } from '@chakra-ui/react';

import { AuthContext } from '../../../Contexts/authContext';

type MessageProps = {
  content: string;
  from: string;
  nameTo: string;
  to: string;
  type: string;
  timeStamp: any;
}

type MessageBoxProps = {
  data: MessageProps;
}

export default function MessageBox({ data }: MessageBoxProps) {
  const { user: userLogged } = React.useContext(AuthContext);

  return (
    <Flex justify={userLogged?.uid == data?.from ? 'right' : 'left'}> 
      <Box borderRadius='20' my='3' p='2' px='5' bg={userLogged?.uid == data?.from ? 'var(--primary)' : 'var(--secondary)'} w='250px' >
        <Text my='2' color='var(--white)'>{data?.content}</Text>
        <Text align='right' fontSize='12' color='var(--gray-50)'>{format(utcToZonedTime(new Date(data?.timeStamp), 'America/Sao_Paulo' ), 'dd-MM-yyyy HH:mm' )}</Text>
      </Box>
    </Flex>
  )
}
