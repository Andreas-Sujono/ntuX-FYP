import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import { media } from 'common/styling';

export const TopBox = styled(Paper).attrs({
  sx: {
    padding: '1.5rem',
    minHeight: 140,
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
`;
