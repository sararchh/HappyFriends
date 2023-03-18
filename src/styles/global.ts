import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --white: #FFFFFF;
  --black: #282828;

  --primary: #553fae;
  --secondary: #afa3e2;
  --gray-50: #f2edf0;
  --gray-100: #e1e1e660;
  --gray-300: #a8a8b3;
}

@media (max-width: 1080px){
  html {
    font-size: 93.75%
  }
}

@media (max-width: 720){
  html {
    font-size: 87.5% //14px
  }
}

body {
  background: var(--gray-900);
}

body, input, select, textarea, button {
  font: 400 1rem "Roboto", sans-serif;
}

p {
  color: var(--black)
}

button {
  cursor: pointer;
}

input {
  color: var(--black);
}

a {
  color: inherit;
  text-decoration: none;
}`;