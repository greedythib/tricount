import { useContext } from "react";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { ThemeContext } from "../../context/theme-context";

// Global Style
interface GlobalStyleProps {
  readonly isDark: false;
}

const { isDark, toggleButton } = useContext(ThemeContext);

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  body {
    background-color: ${(props) =>
      props.isDark ? String("black") : String("white")}; 
  }
`;

function myStyledGlobalStyle() {
  return <GlobalStyleProps isDark={isDark} />;
}

export default myStyledGlobalStyle;
