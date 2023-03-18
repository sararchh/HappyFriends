import { createContext, ReactNode, useEffect, useState } from "react";
import { firebase, db } from "../services/firebase";
import { collection, addDoc, getFirestore } from 'firebase/firestore';

import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider
} from '@firebase/auth';

import { useRouter } from 'next/router';

import { toast } from 'react-toastify';
import { FullScreenLoading } from "../components/atoms/fullScreenLoading";
import { getRandomString } from "../utils/strings";

type User = {
  uid: string;
  name?: string | null;
  avatar?: string | null;
  email: string | null;
}

type AuthContextType = {
  user: User | undefined;
  token: string;
  loading: boolean;
  signInWithMail: (data: any) => void;
  signUpWithMail: (data: any) => void;
  forgotPassword: (data: any) => void;
  signInWithGoogle: () => void;
  Logout: () => void;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const router = useRouter();

  const [user, setUser] = useState<User | any>(null);
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const privateRoutes = ['/home'];

  useEffect(() => {
    // Quando a aplicacao carregar pela primeira vez, ira verificar se tem usuario logado e redirecionara para home
    const inicialize = () => {
      const user = localStorage.getItem('@user');

      if (user) {
        setUser(JSON.parse(user)); //JSON.parse converte de string para JSON
        router.push('/home');
      } else {
        router.push('/login');
      }
      setTimeout(() => setLoading(false), 2000);

    }

    inicialize();

  }, []);

  useEffect(() => {
    //Quando houver alteracao em router ira verificar se é uma rota privada e se nao existe usuairo logado, para nao deixar acessar telas privadas sem autenticacao
    const user = localStorage.getItem('@user');
    if (privateRoutes.includes(router?.pathname) && !user) {
      router.push('/');
    }

  }, [router]);

  async function signInWithMail(data: any) {
    try {
      const authentication = getAuth(firebase);

      setLoading(true);

      const { user }: any = await signInWithEmailAndPassword(authentication, data.email, data.password);
      // console.log("user",user);
      if (!user?.emailVerified) {
        toast.warn("Confirme seu e-mail para ativar, após retorne e faça login.");
        setLoading(false);
        return;
      }

      const userData = {
        uid: user.uid,
        name: user.displayName,
        avatar: user.photoURL,
        email: user.email,
      }

      setUser(userData);

      setToken(user?.accessToken)

      saveSession(userData, user?.accessToken)

      toast.success('Bem-Vindo, voce esta logado!');

      setLoading(false);

      router.push('/home');

    } catch (error: any) {
      // console.log(error.message);
      setLoading(false);

      if (error.message.includes('user-not-found')) {
        toast.error('Não possui cadastro para esse e-mail.')
        return;
      }
      if (error.message.includes('wrong-password')) {
        toast.error('Senha inválida, verifique.')
        return;
      }
      toast.error('E-mail ou senha inválido!')
    }

  }

  function saveSession(user: User, token: string) {
    localStorage.setItem('@user', JSON.stringify(user));
    localStorage.setItem('@token', token);
  }

  function clearSession() {
    localStorage.removeItem('@user');
    localStorage.removeItem('@token');
  }

  async function signUpWithMail({ email, password }: any) {
    try {
      const authentication = getAuth(firebase);
      setLoading(true);
      const response: any = await createUserWithEmailAndPassword(authentication, email, password);
      // console.log("response", response);

      const { user: { displayName, photoURL, email: emailUser, uid } } = response;

      createUserFirestore({
        name: displayName || getRandomString(),
        email: emailUser,
        uid: uid,
        avatar: photoURL || `https://api.multiavatar.com/${getRandomString()}.svg`
      });

      await sendEmailVerification(response?.user);

      toast.info('Enviamos uma verificação para seu e-mail, valide-o e realize o login');
      setLoading(false);

    } catch (error: any) {
      // console.log(error);
      setLoading(false);
      if (error.message.includes('email-already-in-use')) {
        toast.error('Já possui cadastro feito com esse e-mail.')
        return;
      }

      toast.error('Houve erro ao realizar cadastro, tente novamente!')
    }
  }

  async function createUserFirestore(data: any) {
    // console.log(data);
    try {
      const userCreated = await addDoc(collection(db, 'users'), data);
      // console.log('created', userCreated);

    } catch (error) {
      // console.log(error);
    }
  }

  async function forgotPassword(email: string) {
    try {
      // console.log(email);
      const authentication = getAuth(firebase);
      setLoading(true);

      await sendPasswordResetEmail(authentication, email);
      // console.log("response",response);
      toast.info('Enviamos um e-mail de recuperação, crie uma nova senha.');
      setLoading(false);

    } catch (error: any) {
      // console.log(error);     
      setLoading(false);
      if (error.message.includes('user-not-found')) {
        toast.error('Este e-mail não se encontra na base de dados')
        return;
      }

      toast.error('Houve erro ao recuperar senha, tente novamente!')

    }
  }

  async function signInWithGoogle() {
    try {
      const authentication = getAuth(firebase);
      const provider = new GoogleAuthProvider();
      setLoading(true);

      const { user }: any = await signInWithPopup(authentication, provider);
      // console.log(response);

      const { displayName, photoURL, email: emailUser, uid } = user;

      createUserFirestore({
        name: displayName || getRandomString(),
        email: emailUser,
        uid: uid,
        avatar: photoURL || `https://api.multiavatar.com/${getRandomString()}.svg`
      });

      const userData = {
        uid: user.uid,
        name: user.displayName,
        avatar: user.photoURL,
        email: user.email,
      }

      setUser(userData);

      setToken(user?.accessToken)

      saveSession(userData, user?.accessToken)

      toast.success('Bem-Vindo, voce esta logado!');

      setLoading(false);

      router.push('/home');

    } catch (error) {
      setLoading(false);

    }
  }

  function Logout() {
    const authentication = getAuth(firebase);

    authentication.signOut();

    setUser(null);
    setToken('');
    clearSession();
    router.reload();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        signInWithMail,
        signUpWithMail,
        forgotPassword,
        signInWithGoogle,
        Logout
      }}>
      {loading && (
        <FullScreenLoading />
      )}

      {!loading && (
        props.children
      )}
    </AuthContext.Provider>
  );
}