import styled from 'styled-components';
import Box from '@mui/material/Box';
import { PageContentContainer } from 'Components/shared/Shared.styles';
import { media } from 'common/styling';

export const BackgroundContainer = styled.div`
  width: 100%;
  height: 280px;
  background: #f5f5f5;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const StyledBox = styled(Box).attrs({
  sx: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 12,
    zIndex: 2,
    position: 'relative',
  },
})`
  ${media.lessThan('md')`
    .title{
      font-size: 1.4rem
    }
    .subtitle{
      font-size: 1rem
    }
  `}
`;

export const StyledForm = styled(Box).attrs({
  sx: {
    mt: 3,
    border: '1px solid #fdf5f5',
    background: '#FFFFFF',
  },
  component: 'form',
})<any>`
  padding: 36px 18px;
  ${media.lessThan('md')`
    padding: 16px
  `};
`;
