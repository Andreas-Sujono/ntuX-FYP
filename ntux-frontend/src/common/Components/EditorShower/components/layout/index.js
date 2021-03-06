/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Button from '../button';
import ContextMenu from '../contextMenu';
import styles from './styles.module.scss';
import GithubIcon from '../../images/github.svg';
import UserIcon from '../../images/user.svg';

const Layout = ({ children }) => {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  const isLoginPage = false;
  const isAuth = false;

  const toggleContextMenu = () => {
    setIsContextMenuOpen(!isContextMenuOpen);
  };

  const closeContextMenu = () => {
    setIsContextMenuOpen(false);
  };

  const handleNavigation = (path) => {
    closeContextMenu();
  };

  return (
    <div id="layoutRoot">
      <header className={styles.headerBar}>
        <div className={styles.logo}>
          <a href="/" role="link" tabIndex="0">
            notion<span style={{ fontSize: '1.25rem' }}>.clone</span>
          </a>
        </div>
        <nav className={styles.nav}>
          {!isLoginPage && !isAuth && <Button href="/login">Login</Button>}
          {!isLoginPage && isAuth && (
            <div className={styles.user}>
              <span
                role="button"
                tabIndex="0"
                onClick={() => toggleContextMenu()}
              >
                <img src={UserIcon} alt="User Icon" />
              </span>
            </div>
          )}
          {!isLoginPage && isAuth && isContextMenuOpen && (
            <ContextMenu
              menuItems={[
                {
                  id: 'pages',
                  label: 'Pages',
                  action: () => handleNavigation('/pages'),
                },
                {
                  id: 'account',
                  label: 'Account',
                  action: () => handleNavigation('/account'),
                },
                {
                  id: 'logout',
                  label: 'Logout',
                  action: () => handleNavigation('/logout'),
                },
              ]}
              closeAction={() => closeContextMenu()}
              isTopNavigation={true}
            />
          )}
        </nav>
      </header>
      <main className={styles.content}>{children}</main>
      <footer className={styles.footerBar}>
        <hr className={styles.hr} />
        <div className={styles.github}>
          <a
            href="https://github.com/konstantinmuenster/notion-clone"
            rel="noopener noreferrer"
            role="link"
            tabIndex="0"
          >
            <img src={GithubIcon} alt="Github Icon" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
