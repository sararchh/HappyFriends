import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  @media(max-width:995px){
    flex-direction: column;
    justify-content: flex-start;
  }
`;

export const ContentLeft = styled.div`
  width: 300px;
  height: 100vh;
  
  .text-title {
    text-transform: capitalize;
  }

  span {
    background: transparent !important;
  }

  .list-searched {
    height: calc(100vh - 360px);
    overflow: auto;
    overflow-y: scroll;
  }
`;

export const ContentRight = styled.div`
  width: calc(100vw - 300px);
  height: 100vh;
  background: var(--gray-50);
  
  @media(max-width:995px){
    width: 100vw;
  }
`;

export const ContentNoData = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BottomMenu = styled.div`
 height: 60px;
 display: none;

 @media(max-width:995px){
    display: block;
  }
`;

