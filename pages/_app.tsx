import type { AppProps } from 'next/app'
import { GlobalStyle } from "../src/styles/global";
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { AuthContextProvider } from '../src/Contexts/authContext';
import { UserContextProvider } from '../src/Contexts/userContext';
import { ChatContextProvider } from '../src/Contexts/chatContext';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {

  // React.useEffect(() => {
  //   // Remove the server-side injected CSS.
  //   const jssStyles: any = document.querySelector('#jss-server-side');
  //   if (jssStyles) {
  //     jssStyles.parentElement.removeChild(jssStyles);
  //   }

  // }, []);

  return (

    <ChakraProvider>
      <GlobalStyle />
      <AuthContextProvider>
        <UserContextProvider>
          <ChatContextProvider>
          <ToastContainer />
          <Component {...pageProps} />
          </ChatContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  )
}

export default MyApp