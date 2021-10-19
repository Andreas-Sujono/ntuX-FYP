import { generateMedia } from 'styled-media-query';

export const media = generateMedia({
  xl: '1440px',
  lg: '1270px',
  md: '908px',
  sm: '550px',
});

export default media;

/**
 * lessThan(breakpoint | size)
greaterThan(breakpoint | size)
between(firstBreakpoint | firstSize, lastBreakpoint | lastSize)
 */
