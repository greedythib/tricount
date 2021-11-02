import { useContext } from "react";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { ThemeContext } from "../../context/theme-context";

// Global Style
interface GlobalStyleProps {
  readonly isDark: boolean;
}

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  body {
    background-color: ${(props) =>
      props.isDark ? String("black") : String("white")};
    color: ${(props) => (props.isDark ? String("white") : String("black"))};
  }
`;

function MyStyledGlobalStyle() {
  const { isDark } = useContext(ThemeContext);
  return <GlobalStyle isDark={isDark} />;
}

export default MyStyledGlobalStyle;
