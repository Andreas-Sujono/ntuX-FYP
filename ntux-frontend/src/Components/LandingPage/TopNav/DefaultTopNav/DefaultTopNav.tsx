import React, { memo, useState, useEffect, useCallback } from 'react';
import { HamburgerIcon, CloseIcon } from 'react-dre/lib/Icon';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import queryString from 'query-string';
// import { Link as ScrollLink } from 'react-scroll';
import DropdownButton from '../../../../common/Components/DropdownButton';
import { routes } from '../../../Routes/data';
import {
  GlobalStyle,
  BackgroundContainer,
  Container,
  LogoContainer,
  InlineUl,
  DropdownUlContainer,
  DropdownUl,
  DropdownLi,
} from './Styles';
import { useThemeContext } from '../../../../App/ThemeProvider';

const dropdownList = [
  {
    id: '1',
    path: routes.JOB.BASE,
    name: 'Job Portal',
    desc: 'Find job from your favorite websites',
  },
  {
    id: '2',
    path: routes.EVENT.BASE,
    name: 'Events & Webinar',
    desc: 'Find Events and Webinar from your favorite websites',
  },
  {
    id: '3',
    path: routes.FORUM.BASE,
    name: 'Forum QnA',
    desc: 'Ask your doubts and contribute back to community',
  },
  {
    id: '4',
    path: routes.PROJECT.BASE,
    name: 'Freelance & Part Time Projects',
    desc: 'Take freelance project to earn more money',
  },
  {
    id: '5',
    path: routes.BLOG.BASE,
    name: 'Blog',
    desc: 'Write and share your experience to the world',
  },
];

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

  const renderDropdownList: any = (
    item: typeof renderDropdownList[0],
    closeDropdown: () => void,
  ) => {
    return (
      <DropdownLi onClick={closeDropdown} key={item.id}>
        <HashLink smooth to={item.path}>
          <div className="name">{item.name}</div>
          <div className="desc">{item.desc}</div>
        </HashLink>
      </DropdownLi>
    );
  };

  // const compareWithCurrentPath = useCallback(
  //   (path: string) => {
  //     const currentPath = location.pathname;
  //     console.log('currentPath: ', currentPath);
  //     return matchPath(currentPath, { path, exact: true });
  //   },
  //   [location.pathname],
  // );

  const renderWithLink = useCallback(
    (path: string, id: string, el: React.ReactNode) => {
      const withHash =
        path + path[path.length - 1] === '/' ? `#${id}` : `/#${id}`;

      // console.log(compareWithCurrentPath(path), withHash);

      return (
        <HashLink smooth to={withHash}>
          {el}
        </HashLink>
      );

      // return compareWithCurrentPath(path) ? (
      //   <ScrollLink to={id} spy smooth duration={500}>
      //     {el}
      //   </ScrollLink>
      // ) : (
      //   <HashLink smooth to={withHash}>
      //     {el}
      //   </HashLink>
      // );
    },
    [location.pathname],
  );

  const isFeedPath = matchPath(location.pathname, { path: routes.FEED.BASE });
  const isEntertainmentPath = matchPath(location.pathname, {
    path: routes.ENTERTAINMENT.BASE,
  });

  const renderDefaultListItem = useCallback(() => {
    return (
      <>
        <li>
          <Link to={routes.LP_HOMEPAGE}>Home</Link>
        </li>
        <li>
          {renderWithLink(
            routes.LP_HOMEPAGE,
            'subscription',
            <>Subscription</>,
          )}
        </li>
        <li className="dropdown-button-container">
          <DropdownButton
            buttonEl={<div className="products-button">Products</div>}
            listData={dropdownList}
            renderList={renderDropdownList}
            darkTheme={darkTheme}
          />
        </li>
        <li className={isFeedPath ? 'active' : undefined}>
          <Link to={routes.FEED.BASE}>Feed</Link>
        </li>
        <li className={isEntertainmentPath ? 'active' : undefined}>
          <Link to={routes.ENTERTAINMENT.BASE}>Entertainment</Link>
        </li>
        <li className="highlighted">
          <div className="button">
            <HashLink smooth to={routes.LP_HOMEPAGE + '/#login'}>
              Login/Sign Up
            </HashLink>
          </div>
        </li>
      </>
    );
  }, [darkTheme, isFeedPath, isEntertainmentPath]);

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
