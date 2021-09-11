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
  initialColorMode: "light",
  useSystemColorMode: false,
}

const theme = extendTheme(
  { config },
  {components: {
    Text: {
      // 1. We can update the base styles
      baseStyle: {
        color: "white", // Normally, it is "semibold"
        letterSpacing:".15rem"
      }
    },
    Button: {
      // 1. We can update the base styles
      baseStyle: {
        letterSpacing:".25rem", // Normally, it is "semibold"
      }
    },
    Heading: {
      // 1. We can update the base styles
      baseStyle: {
        color: "white", // Normally, it is "semibold"
        letterSpacing:".2rem"
      }
    },
    Menu: {
      // 1. We can update the base styles
      baseStyle: {
        color: "black", // Normally, it is "semibold"
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


// colors: {
//   black: '#16161D',
// },
// fonts,
// breakpoints,
// icons: {
// logo: {
//   path: (
//     <svg
//       width="3000"
//       height="3163"
//       viewBox="0 0 3000 3163"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <rect width="3000" height="3162.95" fill="none" />
//       <path
//         d="M1470.89 1448.81L2170 2488.19H820V706.392H2170L1470.89 1448.81ZM1408.21 1515.37L909.196 2045.3V2393.46H1998.84L1408.21 1515.37Z"
//         fill="currentColor"
//       />
//     </svg>
//   ),
//   viewBox: '0 0 3000 3163',
// },
// },
export default theme
