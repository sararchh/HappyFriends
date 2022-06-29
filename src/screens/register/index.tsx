import React from 'react';
import Link from 'next/link';

import { useForm } from 'react-hook-form'; //gerencia formulario
import { yupResolver } from '@hookform/resolvers/yup'; //validador para Yup
import * as Yup from 'yup'; //valida os campos e seu tipos

import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  Box,
  Container as ContainerChakra,
  Stack,
  Heading
} from '@chakra-ui/react';

import Image from 'next/image';
import { AuthContext } from '../../Contexts/authContext';
import InputComponent from '../../components/atoms/input';
import ButtonComponent from '../../components/atoms/button';
import LoginTemplate from '../../components/templates/loginTemplate';

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const { signUpWithMail, loading } = React.useContext(AuthContext)

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Digite e-mail válido').required('O e-mail é obrigatório'),
    password: Yup.string().min(6, 'Minimo 6 caracteres').required('Senha obrigatório')
  });

  const formOptions = { resolver: yupResolver(validationSchema) }

  const { handleSubmit, setValue, getValues, formState, setError } = useForm(formOptions);
  const { errors } = formState;


  const handleRegister = () => {
    const values = getValues();

    signUpWithMail(values)

    // console.log(values);

    // setError('email', { type: 'manual', message: 'Email erro' })

  }

  return (
    <LoginTemplate>

      <ContainerChakra mb={5} w='100%' centerContent>
        <Box mb={5} w='70px'>
          <Image src="/assets/logo.png" width={60} height={60} />
        </Box>
        <Heading fontSize='2xl'>Realize seu cadastro</Heading>
      </ContainerChakra>


      <Box mb={5} w='100%'>
        <form onSubmit={handleSubmit(handleRegister)}>


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
          </Box>

          <Stack direction='row' spacing={4} align='center' justify="center">
            <ButtonComponent
              width={200}
              colorScheme='pink'
              type='submit'
              title='Registrar'
              loading={loading}
            />
          </Stack>

          <Box mt={5} w='100%'>
            <Stack direction='row' spacing={4} align='center' justify="center">
              <Link href="/login">
                <Text fontSize="12" color='#553fae' cursor='pointer' >Já possui cadastro? Faça login.</Text>
              </Link>
            </Stack>
          </Box>

        </form>
      </Box>

    </LoginTemplate>
  )
}

export default Register;

