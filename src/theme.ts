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
        // make text colour lower contrast to be easier on the eyes
        color: "gray.200",
        fontWeight: "450",
        // slnt is fix for Safari italicising variable fonts by default
        fontVariationSettings: "'wght' 450, 'slnt' 0",
      },
      "a": {
        color: "primary.300",
        textDecoration: "underline",
        textUnderlineOffset: "0.1em",
        textDecorationThickness: "0.05em",
        textDecorationSkipInk: "skip",
      },
      "a:hover, a:active": {
        color: "primary.400",
      },
      // make strong and emphasised text slightly brighter
      "strong, b, em, i": {
        color: "gray.100",
        fontSynthesis: "none",
      },
      "strong, b": {
        fontWeight: "600",
        // slnt is fix for Safari italicising variable fonts by default
        fontVariationSettings: "'wght' 600, 'slnt' 0",
      },
      "em, i" : {
        fontStyle: "italic",
        fontSynthesis: "none",
        fontVariationSettings: "'slnt' 10",
      },
      "h1, h2, h3, h4, h5, h6" : {
        fontWeight: "500",
        // slnt is fix for Safari italicising variable fonts by default
        fontVariationSettings: "'wght' 500, 'slnt' 0",
      }
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
