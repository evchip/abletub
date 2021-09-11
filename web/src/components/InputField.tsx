import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    textarea?: boolean;
    size?: string;
};

export const InputField: React.FC<InputFieldProps> = ({
    label,
    textarea,
    size: _, 
    ...props
    }) => {

    const [field, {error}] = useField(props);

    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            {textarea ? (
                <Textarea {...field} placeholder={props.placeholder} id={field.name} border="1px" borderColor="pink" />
            ): (
                <Input {...field} {...props} id={field.name} border="1px" borderColor="white" />
            )}
            
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    )
}
