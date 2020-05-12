import { SCREEN_S, SCREEN_M, SCREEN_ML, SCREEN_L, SCREEN_XL } from 'constants';

const breakPoints = {
  small: SCREEN_S,
  medium: SCREEN_M,
  mlarge: SCREEN_ML,
  large: SCREEN_L,
  xlarge: SCREEN_XL,
};

const mediaQueries = Object.entries(breakPoints).reduce(
  (obj, [size, value]) => ({
    ...obj,
    [size]: `@media (min-width: ${value}px)`,
  }),
  {}
);

export default {
  fontFamily: "'Fira Sans', Arial, sans-serif",
  breakpoints: Object.values(breakPoints).map((br) => `${br}px`),
  mediaQueries,
  colors: {
    white: '#fff',
    black: '#000',
    green: '#97be32',
    darkGreen: '#658022',
    slate: '#555',
    slateDark: '#333',
    border: '#e5e5df',
    yellow: '#fffee2',
    error: '#ed1846',
    grey: '#aaa',
    lightGrey: '#f7f7f7',
    warmGrey: '#999',
    darkGrey: 'd6d6d9',
    greyishBrown: '#4a4a4a',
  },
  grid: {
    maxWidth: '1120px',
    desktopGutter: '20px',
    mobileGutter: '16px',
    headerHeight: '58px',
  },
};
