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

export const FeatureBox = styled(Paper).attrs({
  sx: {
    padding: '1.5rem 1rem',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '8px',
    position: 'relative',
  },
})<any>`
  strong {
    color: #c63044;
  }
`;
