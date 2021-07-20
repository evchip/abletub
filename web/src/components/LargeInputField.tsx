import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/react';
// import { Input, Textarea } from '@chakra-ui/core';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react'

type TextareaFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    size: string;
    textarea?: boolean;
};

export const LargeInputField = ({
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
                <Textarea {...field} {...props} id={field.name} />
            )}
            <Textarea {...field} {...props} id={field.name} />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    )
}
