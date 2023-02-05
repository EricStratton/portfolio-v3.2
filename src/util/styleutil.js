import facepaint from 'facepaint';

const breakpoints = [36, 48, 62, 75];

export const mQ = facepaint(breakpoints.map((bp) => `@media(min-width: ${bp}em)`));
