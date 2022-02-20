import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import { media } from 'common/styling';

export const TopBox = styled(Paper).attrs({
  sx: {
    padding: '2rem 2rem',
    minHeight: 160,
    background: 'rgba(174, 182, 255, 0.48)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '16px',
    position: 'relative',
    mt: 2,
  },
})`
  .side-image {
    position: absolute;
    bottom: 5%;
    right: 10%;
    width: 250px;
  }

  ${media.lessThan('md')`
    .side-image{
      display: none;
    }
  `}
`;

export const StyledBox = styled(Paper).attrs({
  sx: {
    p: 2.5,
    pb: 3,
    pt: 3,
    position: 'relative',
  },
})<any>``;
