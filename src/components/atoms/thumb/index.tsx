import Image from 'next/image';
import React from 'react';

// import { Container } from './styles';

type ThumbProps = {
  alt: string;
  src: string;
  width: number;
  height: number;
}

const Thumb: React.FC<ThumbProps> = ({ alt, src, width, height }) => {
  return (
    <Image alt={alt} src={src} width={width} height={height}/>
  )
}

export default Thumb;