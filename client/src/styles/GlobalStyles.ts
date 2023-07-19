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

  .sr-only {
    border: 0 !important;
    clip: rect(1px, 1px, 1px, 1px) !important; /* 1 */
    -webkit-clip-path: inset(50%) !important;
      clip-path: inset(50%) !important;  /* 2 */
    height: 1px !important;
    margin: -1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    width: 1px !important;
    white-space: nowrap !important;            /* 3 */
  }

  @media (max-width: 767px) {
    .table-data tr {
      display: flex;
      flex-direction: column;

      
    }

    .table-dat2a tr {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: auto;
      grid-column-gap: 0px;
      grid-row-gap: 0px;
    }
 
    .table-data2 tr td:nth-of-type(5n + 1) { grid-area: fit-content(300px) fit-content(300px) 1fr; }
.table-data2 tr td:nth-of-type(5n + 2) { grid-area: fit-content(300px) fit-content(300px) 1fr;; }
.table-data2 tr td:nth-of-type(5n + 3) { grid-area: 2 / 1 / 3 / 6; }
.table-data2 tr td:nth-of-type(5n + 4) { grid-area: 3 / 1 / 4 / 2; }
.table-data2 tr td:nth-of-type(5n + 5) { grid-area: 3 / 2 / 4 / 6; } 
      
.table-data2 tr td:nth-of-type(5n + 4),
.table-data2 tr td:nth-of-type(5n + 5) {
  white-space: nowrap;
}

.table-data tr td:nth-of-type(5n + 5) button {
float: left;
}

    .table-data thead {
      border: 3px solid #f00;
      border: 0 !important;
      clip: rect(1px, 1px, 1px, 1px) !important; /* 1 */
      -webkit-clip-path: inset(50%) !important;
        clip-path: inset(50%) !important;  /* 2 */
      height: 1px !important;
      margin: -1px !important;
      overflow: hidden !important;
      padding: 0 !important;
      position: absolute !important;
      width: 1px !important;
      white-space: nowrap !important;            /* 3 */
    }

    .table-data tr th,
    .table-data tr td {
      border-bottom: 0;
      padding-right: 1rem;
      padding-left: 1rem;
    }
  }

  .icon-muted {
    opacity: .6;
  }

  .spinner {
    animation: spin infinite 5s linear;

    /*You can increase or decrease the timer (5s) to 
     increase or decrease the speed of the spinner*/
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .loading-modal .modal-content {
    background-color: transparent;
    border: 0;
    text-align: center;
  }
`

export default GlobalStyles;