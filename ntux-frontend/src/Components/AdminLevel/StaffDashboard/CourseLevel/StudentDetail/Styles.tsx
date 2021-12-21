import styled from 'styled-components';
import Container from '@mui/material/Container';

export const StyledContainer = styled(Container)<any>`
  .MuiCardHeader-avatar {
    width: 50px;
    height: 50px;
    font-size: 20px;
    > * {
      width: 100%;
      height: 100%;
    }
  }
  .MuiCardHeader-title {
    font-size: 1.3rem;
    font-weight: 500;
  }
  .MuiCardHeader-subheader {
    font-size: 1rem;
  }
`;
