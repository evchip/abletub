import { Box } from '@chakra-ui/react';

export type WrapperVariant = 'small' | 'regular'

interface WrapperProps {
    variant?: WrapperVariant
}

export const Wrapper: React.FC<WrapperProps> = ({children, variant = "regular"}) => {
    return (
        <Box mt={0} mx="auto" maxW={variant === "regular" ? "1500px" : "950px"} width="100%" >
            {children}
        </Box>
    )
}