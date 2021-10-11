import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    gray: {
      800: "#1F2024",
      500: "#8A8A99",
      400: "#ACACB4",
    },
  },
  fonts: {
    heading: "TTCommons, Arial, sans-serif",
    body: "TTCommons, Arial, sans-serif",
  },
});
export default theme;
