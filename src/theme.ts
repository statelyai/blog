import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  fonts: {
    heading: "TTCommons, Arial, sans-serif",
    body: "TTCommons, Arial, sans-serif",
  },
  styles: {
    global: {
      "html, body": {
        backgroundColor: "gray.900",
      },
    },
  },
  shadows: {
    outline: "0 0 0 3px #2E85FF",
  },
  colors: {
    gray: {
      "50": "#EFEFF1",
      "100": "#E1E2E5",
      "200": "#C6C7CD",
      "300": "#ABACB5",
      "400": "#8F919D",
      "500": "#757785",
      "600": "#5D5F6A",
      "700": "#45464F",
      "800": "#2D2E34",
      "900": "#151618",
    },
    primary: {
      300: "#61A3FF",
      400: "#2E85FF",
      500: "#056DFF",
      600: "#1956DD",
    },
    danger: {
      500: "#F44747",
      600: "#EF0F0F",
    },
    warning: {
      500: "#FF9044",
    },
    redAlpha: {
      100: "rgba(244, 71, 71, 0.2)",
    },
  },
});
export default theme;
