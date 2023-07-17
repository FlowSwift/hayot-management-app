import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  :root {
    --theme-primary: #2764A7;
    --theme-secondary: #5A8832;
    --theme-tertiary: #9DCB4B;
    --theme-grey: #F0EDEA;
    --theme-accent: #C47847;

    --theme-gutter-width: 20px;

    --text-color: var(--bs-gray-dark);
    --theme-foreground: var(--bs-gray-dark);
    --theme-background: var(--theme-grey);
  }

  body {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    direction: rtl;
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
    padding-left: var(--theme-gutter-width);
    padding-right: var(--theme-gutter-width);
  }

  // rtl
  .form-select {
    background-position: left .75rem center;
    padding-left: 2.25rem;
    padding-right: .75rem;
  }

  .modal-header .btn-close {
    margin: 0;
  }

  select, button {
    cursor: pointer;
  }

  th, .form-label {
    margin-bottom: .25rem;
    color: var(--bs-gray-dark);
    font-size: .9em;
    font-weight: 700;
  }

  @media (max-width: 767px) {
    .table-data tr {
      display: flex;
      flex-direction: column;
    }
  }
`

export default GlobalStyles;