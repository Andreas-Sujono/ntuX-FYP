import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import { media } from 'common/styling';

export const TopBox = styled(Paper).attrs({
  sx: {
    padding: '1rem',
    minHeight: 100,
    boxShadow: '0px 4px 4px rgba(253, 145, 145, 0.25)',
    borderRadius: '16px',
    position: 'relative',
    mt: 2,
  },
})`
  background: white;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  .grid-item-2 {
    text-align: right;
  }

  ${media.lessThan('md')`
    .grid-item-2{
      text-align: left;
      margin-top: 1rem;
    }
  `}
`;
