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

  .searchbox input {
    max-width: 400px;
  }

  @media (max-width: 767px) {
    .table-data tr {
      display: flex;
      flex-direction: column;      
    }

    .table-data tr td {
      padding-top: 5px;
      padding-bottom: 5px;
    }
    
    .table-data tr td:first-child {
      padding-top: 20px;
    }

    .table-data tr td:last-child {
      padding-bottom: 20px;
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

  .modal-small {
    --bs-modal-width: 350px;
    text-align: center;
  }

  .log-new {
    color: var(--bs-success) !important;
  }

  .log-old {
    color: var(--bs-danger) !important;
  }

  .edit-row {
    position: relative;
  }

  .btn-edit {
    position: absolute;
    top: -2.5px;
  }
`

export default GlobalStyles;