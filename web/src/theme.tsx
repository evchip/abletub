import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const config : ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

const theme = extendTheme(
  { config },
  {components: {
    Box: {
      baseStyle: {
        display: "flex",
        justifyContent: "center"
      }
    }
    ,
    Text: {
      baseStyle: {
        color: "white",
        letterSpacing:".15rem"
      }
    },
    Button: {
      baseStyle: {
        letterSpacing:".25rem",
      }
    },
    Heading: {
      baseStyle: {
        color: "white", 
        letterSpacing:".2rem",
        fontWeight: "light"
      }
    },
    Menu: {
      baseStyle: {
        color: "black",
        bgColor: "black",
        letterSpacing:".5rem",
      },
      sizes: {
        md: {
          h: "24px",
          fontSize: "sm",
          px: "18px",
        },
        lg: {
          h: "36px",
          fontSize: "md",
          px: "24px",
        },
        xl: {
          h: "56px",
          fontSize: "lg",
          px: "32px",
        },
      },
    },
    MenuButton: {
      baseStyle: {
        fontSize:"{ base: 12px, md: 14px, lg: 16px }",
        as:"Button",
        rightIcon:"<ChevronDownIcon />",
        px:"4",
        py:"2",
        color:"black",
        transition:"all 0.2s",
        borderRadius:"md",
        borderWidth:"1px",
        _hover:"{ bg: gray.400 }",
        _expanded:"{ bg: blue.400 }",
        _focus:"{ boxShadow: outline }",
        letterSpacing:".5rem"
      }
    },
    FormLabel: {
      baseStyle: {
        fontWeight: "normal",
        letterSpacing:".2rem"
      }
    }
  }}
)

export default theme
