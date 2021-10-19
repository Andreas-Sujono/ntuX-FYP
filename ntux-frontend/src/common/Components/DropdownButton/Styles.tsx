import styled from 'styled-components';
import { media } from '../../styling';

export const Container = styled.div`
  position: relative;
  .common-dropdown-container-enter {
    opacity: 0;
    transform: scale(0.9);
  }
  .common-dropdown-container-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 200ms, transform 200ms;
  }
  .common-dropdown-container-exit {
    opacity: 1;
  }
  .common-dropdown-container-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 200ms, transform 200ms;
  }
`;

export const ButtonContainer = styled.div``;

export const DropdownHoverContainer = styled.div`
  position: absolute;
  top: 0px;
  left: 0%;
  padding-top: 40px;
  /* background: red; */
  width: 100%;

  ${media.lessThan('sm')`
    left: 1%;
  `}
`;

export const DropdownContainer = styled.ul<{ darkTheme?: boolean }>`
  background: ${(props) => (props.darkTheme ? '#1D1D1D' : 'white')};
  padding: 12px;
  padding-left: 20px;
  width: 300px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  box-shadow: 0px 2px 2px rgba(181, 181, 181, 0.25);
  position: absolute;
  top: 40px;
  left: -100%;

  > li {
    list-style-type: none;
    &:not(:first-child) {
      margin-top: 1em;
    }
  }

  ${media.lessThan('sm')`
    left: 0;
  `}
`;
