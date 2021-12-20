import React, { memo, useState, useEffect, useCallback } from 'react';
import { HamburgerIcon, CloseIcon } from 'react-dre/lib/Icon';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import queryString from 'query-string';
import { routes } from '../../../Routes/data';
import {
  GlobalStyle,
  BackgroundContainer,
  Container,
  LogoContainer,
  InlineUl,
  DropdownUlContainer,
  DropdownUl,
} from './Styles';
import { useThemeContext } from '../../../../App/ThemeProvider';
import { Button } from '@mui/material';

// const dropdownList: any = [];

const DefaultTopNav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const queryObj: Record<string, any> =
    queryString.parse(location.search) || {};
  const { darkTheme } = useThemeContext();
  const logoImagePath = `${process.env.PUBLIC_URL}/assets/logos/${
    darkTheme ? 'full-white-logo' : 'full-colored-logo'
  }.svg`;

  const showInlineUl = window.innerWidth > 768;

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY > 100) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  useEffect(() => {
    setShowDropdown(false);
  }, [location.pathname]);

  const renderWithLink = useCallback(
    (path: string, id: string, el: React.ReactNode) => {
      const withHash =
        path + path[path.length - 1] === '/' ? `#${id}` : `/#${id}`;
      return (
        <HashLink smooth to={withHash}>
          {el}
        </HashLink>
      );
    },
    [location.pathname],
  );

  const renderDefaultListItem = useCallback(() => {
    return (
      <>
        <li>
          {renderWithLink(
            routes.LP_HOMEPAGE,
            'explore-courses',
            <>Expore Courses</>,
          )}
        </li>
        <li>
          <Link to={routes.FORUM.QUESTIONS}>Forum Discussion</Link>
        </li>
        <li>
          <Link to={routes.ADMIN.STUDENT_TUTORING}>Student Tutoring</Link>
        </li>
        <li className="highlighted">
          <Link to={routes.LOGIN_PAGE}>
            <Button variant="contained" color="primary">
              Login
            </Button>
          </Link>
        </li>
      </>
    );
  }, [darkTheme]);

  if (queryObj.hideNav) return <></>;

  return (
    <BackgroundContainer isScrolled={isScrolled} isDarkTheme={darkTheme}>
      <GlobalStyle showDropdown={showDropdown} />
      <Container>
        <LogoContainer>
          <Link to={routes.LP_HOMEPAGE}>
            <img src={logoImagePath} />
          </Link>
        </LogoContainer>
        {showInlineUl && <InlineUl>{renderDefaultListItem()}</InlineUl>}
        {!showInlineUl && (
          <DropdownUlContainer>
            {showDropdown ? (
              <CloseIcon
                className="icon"
                onClick={() => setShowDropdown(!showDropdown)}
              />
            ) : (
              <HamburgerIcon
                className="icon"
                onClick={() => setShowDropdown(!showDropdown)}
              />
            )}

            <DropdownUl showDropdown={showDropdown} isDarkTheme={darkTheme}>
              {renderDefaultListItem()}
            </DropdownUl>
          </DropdownUlContainer>
        )}
      </Container>
    </BackgroundContainer>
  );
};

export default memo(DefaultTopNav);
