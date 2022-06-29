import { CircularProgress } from '@chakra-ui/react';
import React from 'react';

// import { Container } from './styles';

export const FullScreenLoading: React.FC = () => {
  return (
    <div
      style={{
        background: '#f5f7fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
        zIndex: 99999,
      }}
    >
      <div
      style={{ position: 'absolute', top: '45%'}}
      >
        <CircularProgress isIndeterminate color='#553fae' size={100}  />
      </div>
    </div>
  )
}

