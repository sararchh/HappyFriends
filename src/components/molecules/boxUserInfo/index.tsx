import React from 'react';

import {
  Box,
  Stack,
  Button,
} from '@chakra-ui/react';
import { AuthContext } from '../../../Contexts/authContext';
import AvatarComponent from '../../atoms/avatar';

const BoxUserInfo: React.FC = () => {

  const { user, Logout } = React.useContext(AuthContext);

  return (
    <Box p={5} mt={1} minHeight={100} mb={4} w='100%'>
      <Stack direction='column' align='center' justify="center">
        <AvatarComponent size='xl' colorScheme='#FFFFFF' name={`${user?.name}`} src={`${user?.avatar}`} />
        <p className='text-title'>{user?.name}</p>
        <Button colorScheme='red' size="xs" onClick={Logout}>Sair</Button>
      </Stack>
    </Box>
  );
}

export default BoxUserInfo;