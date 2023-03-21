import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  
  main {
    max-width: 1400px;
    margin: 0 auto;
    padding-top: 40px;
    padding-bottom: 40px;
  }
`

export default GlobalStyles;