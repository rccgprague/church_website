import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      black: string;
      dark: string;
      darkGrey: string;
      grey: string;
      white: string;
      smoke: string;
      orange: string;
      smokeOrange: string;
      blue: string;
      light: string;
      secondaryWhite: string;
      gray: string;
      graybg: string;
    };
  }
};