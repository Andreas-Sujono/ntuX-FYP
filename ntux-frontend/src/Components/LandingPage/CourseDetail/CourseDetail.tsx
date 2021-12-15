import React, { memo } from 'react';
import { PageContentContainer } from 'Components/shared/Shared.styles';
import {
  FullWidthContainer,
  BackgroundContainer,
  TopSummary,
  Status,
  AvailabilityBox,
  NavBar,
  Content,
} from './Styles';
import { PrimaryButton } from 'common/Components/Button';
import { HashLink } from 'react-router-hash-link';
import { Avatar, Button, CardHeader } from '@mui/material';
import { red } from '@mui/material/colors';

function CourseDetail(): React.ReactElement {
  return (
    <FullWidthContainer>
      <BackgroundContainer />
      <PageContentContainer>
        <TopSummary>
          <div className="left-content">
            <img src="https://i.pcmag.com/imagery/articles/00tLYTqwmgFvacZlYPc5ecO-8.1583853669.fit_lim.jpg" />
          </div>
          <div className="right-content">
            <h1>Computer Networking I</h1>
            <Status>Open Registration</Status>
            <AvailabilityBox>
              Course Availability:
              <ul>
                <li>20 Oct - 27 Oct 2021</li>
              </ul>
              Registration Availability:
              <ul>
                <li>20 Oct - 27 Oct 2021</li>
              </ul>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="primary"
              >
                Register
              </Button>
            </AvailabilityBox>
          </div>
        </TopSummary>

        <NavBar>
          <HashLink smooth to="#about">
            About
          </HashLink>
          <HashLink smooth to="#objectives">
            Objectives
          </HashLink>
          <HashLink smooth to="#outline">
            Outline
          </HashLink>
          <HashLink smooth to="#lecturers">
            Lecturers
          </HashLink>
        </NavBar>

        <Content>
          <div className="title" id="about">
            About
          </div>
          <div className="content">
            Modern industrial processes are large, complex and have high degree
            of interaction with many variables. This makes problem solving
            difficult and leads to “disappearing problem” syndrome. Problem
            often disappear without solving will reappear again. This course
            aims to provide an elementary approach of combining cause and effect
            problem solving thinking with formulation of theoretically correct
            hypothesis to provide quick and effective problem-solving techniques
            for the process industries. The initial part of the course aims to
            provide basic problem solving approach applicable to any industrial
            problems and the second part aims to provide basics of some common
            process equipment and utilization of chemical engineering
            fundamentals to develop technically correct hypothesis that is the
            key to the successful problem solving. This course includes both
            sample problems and working sessions to allow participants to
            develop confidence approach.
          </div>
          <hr />
          <div className="title" id="objectives">
            Objectives
          </div>
          <div className="content">
            <ul>
              <li>
                Evaluate product, quotient, power and roots of complex numbers.
              </li>
              <li>
                Use vector operators (dot product and cross product) to solve
                simple
              </li>
              mechanics and geometry problems (e.g. find work done, moment,
              equations for planes, distance form a point to a plane etc.).
              <li>
                Evaluate matrix determinants and use Cramer’s rule to solve
                simultaneous equations.
              </li>
            </ul>
          </div>
          <hr />
          <div className="title" id="outline">
            Outline
          </div>
          <div className="content">
            Complex numbers. Vectors and matrices. Limits and continuity of
            functions. Derivatives. Applications of derivatives. Integration.
            Integration methods. Applications of integration
          </div>
          <hr />
          <div className="title" id="lecturers">
            Lecturers
          </div>
          <div className="content" style={{ fontSize: '30px' }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  M
                </Avatar>
              }
              title="Michelle SHAO Xuguang"
              subheader="Senior Lecturer"
              size="large"
            />
          </div>
        </Content>
      </PageContentContainer>
    </FullWidthContainer>
  );
}

export default memo(CourseDetail);
