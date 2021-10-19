import React, { memo, useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import {
  Container,
  ButtonContainer,
  DropdownHoverContainer,
  DropdownContainer,
} from './Styles';

interface Props {
  buttonEl: React.ReactNode;
  listData: any;
  renderList: (item: any, closeDropdown: () => void) => void;
  darkTheme?: boolean;
}

function DropdownButton({
  buttonEl,
  listData,
  renderList,
  darkTheme,
}: Props): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseHover = (e: any) => {
    if (!containerRef) return;

    const insideHover = containerRef.current?.contains(e.target);
    setIsOpen(!!insideHover);
  };

  useEffect(() => {
    document.addEventListener('mouseover', handleMouseHover);
    return () => document.removeEventListener('mouseover', handleMouseHover);
  }, []);

  return (
    <Container ref={containerRef}>
      <ButtonContainer>{buttonEl}</ButtonContainer>
      <DropdownHoverContainer>
        <CSSTransition
          in={isOpen}
          timeout={200}
          classNames="common-dropdown-container"
          unmountOnExit
        >
          <DropdownContainer darkTheme={darkTheme}>
            {listData.map((item: any) =>
              renderList(item, () => setIsOpen(false)),
            )}
          </DropdownContainer>
        </CSSTransition>
      </DropdownHoverContainer>
    </Container>
  );
}

export default memo(DropdownButton);
