import React from 'react';
import AvatarComponent from '../../atoms/avatar';

type CardListProps = {
  avatar: string,
  email: string,
  name: string,
  uid: string,
  docId?: string | any,
  contactDocId?: string | any,
}

type Props = {
  data: CardListProps,
  onClick: (data: CardListProps) => void,
}

import {
  Box,
  Grid,
  GridItem,
  Text
} from '@chakra-ui/react';

import { ChevronRightIcon } from '@chakra-ui/icons';

export const CardListComponent: React.FC<Props> = ({ data, onClick }) => {

  return (
    <Box bg='var(--gray-50)'
      borderRadius='md'
      h={50} pl={1} pr={1}
      onClick={() => onClick(data)}
      style={{ cursor: 'pointer' }}
    >
      <Grid templateColumns='repeat(7, 1fr)'  >
        <GridItem h={50} style={{ alignItems: 'center', display: 'flex' }}>
          <AvatarComponent size='sm' colorScheme='#FFFFFF' name={data.name} src={data.avatar} />
        </GridItem>

        <GridItem colSpan={5} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
          <Text fontSize='sm'>{data.name}</Text>
          <Text color='var(--gray-300)' fontSize='xs'>{data.email}</Text>
        </GridItem>

        <GridItem h={50} style={{ alignItems: 'center', display: 'flex', justifyContent: 'flex-end' }} >
          <ChevronRightIcon w={6} h={6} style={{ color: 'var(--gray-300)' }} />
        </GridItem>
      </Grid>
    </Box>
  );
}
