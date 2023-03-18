import React from 'react';

import {
  Input,
  InputGroup,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react';

type InputProps = {
  isInvalid?: boolean,
  type: string,
  value?: string,
  variant?: string | 'flushed',
  placeholder: string,
  size?: string | 'md';
  onChange: (value: any) => void;
  messageError?: string;
  rightElement?: React.ReactNode;
}

const InputComponent: React.FC<InputProps> = ({ isInvalid=false, type, variant, placeholder, size, onChange, messageError='',rightElement, value }) => {
  return (

    <FormControl isInvalid={isInvalid} >
      <Input
        type={type}
        value={value}
        variant={variant}
        placeholder={placeholder}
        size={size}
        onChange={(e) => onChange(e.target.value)}
      />
      {rightElement && rightElement}
      <FormErrorMessage>{messageError}</FormErrorMessage>
    </FormControl>
  )
}

export default InputComponent;