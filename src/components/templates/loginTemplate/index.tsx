import React from 'react';

import { Container, Content } from './styles';

type LoginTemplateProps = {
  children: React.ReactNode
}

const LoginTemplate: React.FC<LoginTemplateProps> = ({ children }) => {
  return (
    <Container>
      <Content>
        {children}

      </Content>
    </Container>
  )
}

export default LoginTemplate;