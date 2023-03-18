import React from 'react';

import {
  Avatar
} from '@chakra-ui/react';

type AvatarProps = {
  size: string,
  colorScheme: string,
  name: string,
  src: string,
  border?: string,
}

const AvatarComponent: React.FC<AvatarProps> = ({ size, colorScheme, name, src, border }) => {

  return (
    <>
      <Avatar size={size} colorScheme={colorScheme} name={name} src={src} style={{border: `3px solid ${border}`}} />
    </>
  );
}

export default AvatarComponent;