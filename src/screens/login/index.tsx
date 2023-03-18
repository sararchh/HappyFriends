import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useForm } from 'react-hook-form'; //gerencia formulario
import { yupResolver } from '@hookform/resolvers/yup'; //validador para Yup
import * as Yup from 'yup'; //valida os campos e seu tipos

import {
  InputRightElement,
  Button,
  ButtonGroup,
  Text,
  Box,
  Container as ContainerChakra,
  Stack,
  Heading,
  Divider
} from '@chakra-ui/react';

import { AuthContext } from '../../Contexts/authContext';
import InputComponent from '../../components/atoms/input';
import ButtonComponent from '../../components/atoms/button';
import LoginTemplate from '../../components/templates/loginTemplate';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const { signInWithMail, loading, signInWithGoogle } = React.useContext(AuthContext)

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Digite e-mail válido').required('O e-mail é obrigatório'),
    password: Yup.string().min(6, 'Minimo 6 caracteres').required('Senha obrigatório')
  });

  const formOptions = { resolver: yupResolver(validationSchema) }

  const { handleSubmit, setValue, getValues, formState, setError } = useForm(formOptions);
  const { errors } = formState;


  const handleLogin = () => {
    const values = getValues();

    signInWithMail(values);

    // console.log(values);

    // setError('email', { type: 'manual', message: 'Email erro' })

  }

  return (
    <LoginTemplate>

      <ContainerChakra mb={1} w='300px' flexDirection={"row"} display={"flex"} >
        <Box w='100%'>
          <Image src="/assets/logo.png" width={75} height={75} />
        </Box>
        <Heading mt={3.5} style={{ marginLeft: 5 }} fontSize='3xl'>HappyFriends</Heading>
      </ContainerChakra>


      <Box mt={1} mb={4} w='100%'>
        <Stack direction='row' align='center' justify="center">
          <ButtonGroup size='lg' variant='outline' spacing='4'>
            <Button
              onClick={signInWithGoogle}
            >
              <Image src='/assets/iconGoogle.png' width={25} height={25} />
              <Text fontSize='sm' style={{ marginLeft: 5 }} > Entrar com Google</Text>
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>

      <Divider style={{ width: 200, marginBottom: 10 }} />

      <Text fontSize='lg' mb={2} style={{ marginLeft: 5}} > Realize seu Login</Text>

      <Box mb={5} w='100%'>
        <form onSubmit={handleSubmit(handleLogin)}>

          <Box mb={5} w='100%'>
            <InputComponent
              isInvalid={errors?.email}
              type="email"
              variant='flushed'
              placeholder='Digite seu e-mail'
              size='md'
              onChange={(value) => setValue('email', value)}
              messageError={errors?.email?.message}
            />
          </Box>

          <Box mb={5} w='100%'>
            <InputComponent
              isInvalid={errors?.password}
              type={showPassword ? "text" : "password"}
              variant='flushed'
              placeholder='Digite sua senha'
              size='md'
              onChange={(value) => setValue('password', value)}
              messageError={errors?.password?.message}
              rightElement={
                <InputRightElement width="80px">
                  <Button h='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)}>
                    <Text fontSize='xs'> {showPassword ? 'Esconder' : 'Mostrar'} </Text>
                  </Button>
                </InputRightElement>
              }
            />

            <Box mt={2} w='100%' >
              <Stack direction='row' spacing={4}  justify='right'>
                <Link href="/forgot-password">
                  <Text fontSize="12" color='#553fae' cursor='pointer' >Esqueceu a senha?</Text>
                </Link>
              </Stack>
            </Box>
          </Box>



          <Stack direction='row' spacing={4} align='center' justify="center">
            <ButtonComponent
              width={200}
              colorScheme='pink'
              type='submit'
              title='Acessar'
              loading={loading}
            />
          </Stack>
        </form>

        <Box mt={3} w='100%'>
          <Stack direction='row' spacing={4} align='center' justify="center">
            <Link href="/register">
              <Text fontSize="12" color='#553fae' cursor='pointer' >Ainda não tem registro? Cadastre-se.</Text>
            </Link>
          </Stack>
        </Box>




      </Box>

    </LoginTemplate>
  )
}

export default Login;

