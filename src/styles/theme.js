const breakPoints = {
  small: 320,
  medium: 768,
  large: 1024,
  xlarge: 1080,
};

export const mdqs = Object.entries(breakPoints).reduce(
  (obj, [size, value]) => ({
    ...obj,
    [size]: `@media (min-width: ${value}px)`,
  }),
  {}
);

export default {
  breakpoints: mdqs,
  colors: {
    white: '#fff',
    black: '#000',
    green: '#97be32',
    darkGreen: '#658022',
    slate: '#555',
    slateDark: '#333',
    googleplus: '#da4735',
    twitter: '#598dca',
    facebook: '#3a589b',
    border: '#e5e5df',
    yellow: '#fffee2',
    loss: '#f69',
    gain: '#6d6de5',
    extent: '#a5ed80',
    ocean: '#a4dbfd',
    error: '#ed1846',
    fires: '#f14600',
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
