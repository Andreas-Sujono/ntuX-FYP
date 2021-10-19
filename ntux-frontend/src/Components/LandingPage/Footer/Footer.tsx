import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import {
  Container,
  Row,
  FirstColumn,
  SecondColumn,
  ThirdColumn,
  CopyrightGroup,
} from './Styles';
import { useThemeContext } from '../../../App/ThemeProvider';

const {
  REACT_APP_ORG_EMAIL,
  REACT_APP_PAYPAL_LINK,
  REACT_APP_FEEDBACK_LINK,
  REACT_APP_ORG_NAME,
  REACT_APP_COPYRIGHT_YEAR,
} = process.env;

const Footer: React.FC = () => {
  const location = useLocation();
  const { darkTheme, setDarkTheme } = useThemeContext();
  const logoImagePath = `${process.env.PUBLIC_URL}/assets/logos/${
    darkTheme ? 'full-white-logo' : 'full-colored-logo'
  }.svg`;

  const queryObj: Record<string, any> =
    queryString.parse(location.search) || {};

  if (queryObj.hideFooter) return <></>;

  return (
    <div className="dt-bprimary dt-tprimary">
      <Container id="contact-us">
        <Row>
          <FirstColumn>
            <img src={logoImagePath} alt="DevThinker" />
            <div className="slogan dt-tsecondary">
              Coding never feel this easy
            </div>
          </FirstColumn>
          <SecondColumn>
            <h3 className="dt-tsecondary">Contact</h3>
            <ul>
              <li>
                Email:&nbsp;
                <a
                  href={'mailto:' + REACT_APP_ORG_EMAIL}
                  target="_blank"
                  rel="noreferrer"
                >
                  {REACT_APP_ORG_EMAIL}
                </a>
              </li>
              <li>
                Paypal Donate:&nbsp;
                <a
                  href="https://www.paypal.me/andreassujono"
                  target="_blank"
                  rel="noreferrer"
                >
                  {REACT_APP_PAYPAL_LINK}
                </a>
              </li>
            </ul>
          </SecondColumn>
          <ThirdColumn>
            <h3>Give Feedback</h3>
            {REACT_APP_FEEDBACK_LINK}
            <div
              onClick={() => setDarkTheme(!darkTheme)}
              className="theme-button"
            >
              Change to {darkTheme ? 'light theme' : 'dark theme'}
            </div>
          </ThirdColumn>
        </Row>
        <CopyrightGroup>
          Copyright@{REACT_APP_COPYRIGHT_YEAR} {REACT_APP_ORG_NAME}
        </CopyrightGroup>
      </Container>
    </div>
  );
};

export default memo(Footer);
