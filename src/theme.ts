import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  colors: {
    gray: {
      800: "#1F2024",
      500: "#8A8A99",
      400: "#ACACB4"
    }
  }
})

export default theme;