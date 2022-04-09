import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import {
  Container,
  Row,
  FirstColumn,
  SecondColumn,
  ThirdColumn,
  CopyrightGroup,
} from './Styles';
import { routes } from 'Components/Routes';
// import { useThemeContext } from '../../../App/ThemeProvider';

const {
  REACT_APP_ORG_EMAIL,
  REACT_APP_ORG_PHONE_NUMBER,
  REACT_APP_ORG_NAME,
  REACT_APP_COPYRIGHT_YEAR,
} = process.env;

const Footer: React.FC = () => {
  const location = useLocation();
  const logoImagePath = `${process.env.PUBLIC_URL}/assets/logos/full-white-logo.svg`;

  const queryObj: Record<string, any> =
    queryString.parse(location.search) || {};

  if (queryObj.hideFooter === 'true') return <></>;

  return (
    <div className="w-bprimary w-tprimary" style={{ background: '#181F5E' }}>
      <Container id="contact-us">
        <Row>
          <FirstColumn>
            <img src={logoImagePath} alt="DevThinker" />
            <div className="slogan w-tprimary">One Course Platform For All</div>
          </FirstColumn>

          <ThirdColumn>
            <h3>Features</h3>
            <ul>
              <li>
                <Link to={routes.LOGIN_PAGE}>Login</Link>
              </li>
              <li>
                <Link to={routes.ALL_COURSES}>Explore Courses</Link>
              </li>
              <li>
                <Link to={routes.FORUM.QUESTIONS}>Forum Discussion</Link>
              </li>
              <li>
                <Link to={routes.ADMIN.STUDENT_TUTORING}>Student Tutoring</Link>
              </li>
            </ul>
          </ThirdColumn>

          <SecondColumn>
            <h3 className="w-tprimary">Contact</h3>
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
                Phone Number:&nbsp;
                {REACT_APP_ORG_PHONE_NUMBER}
              </li>
            </ul>
          </SecondColumn>
        </Row>
        <CopyrightGroup>
          Copyright@{REACT_APP_COPYRIGHT_YEAR} {REACT_APP_ORG_NAME}
        </CopyrightGroup>
      </Container>
    </div>
  );
};

export default memo(Footer);
