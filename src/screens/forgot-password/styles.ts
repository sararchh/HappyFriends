import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display:flex;
  align-items: center;
  justify-content: center;
  background: #000000 url('/assets/bg.png');
  background-size: cover;
`;

export const Content = styled.div`
   width: 400px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 40px;
  background: var(--white);
  color: var(--gray-300);

 
`;