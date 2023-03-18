import React from 'react';

// import { Container } from './styles';

import {
  Button,
  Text,
  Container as ContainerChakra,
  Spinner,
} from '@chakra-ui/react';

type ButtonProps = {
  width: number,
  colorScheme: string,
  type?: 'submit' | 'button' | 'reset',
  title: string,
  loading: boolean,
}

const ButtonComponent: React.FC<ButtonProps> = ({ width, colorScheme, type, title, loading }) => {
  return (
    <Button width={width} colorScheme={colorScheme} type={type}>
      {loading ? (
        <Spinner size="sm" />

      ) : (

        <Text fontSize='xs' color="white"> {title} </Text>
      )}
    </Button>
  )
}

export default ButtonComponent;