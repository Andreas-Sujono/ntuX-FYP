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
              <PrimaryButton width="100%">Register</PrimaryButton>
            </AvailabilityBox>
          </div>
        </TopSummary>

        <NavBar>
          <p>About</p>
          <p>Objectives</p>
          <p>Outline</p>
          <p>Lecturers</p>
        </NavBar>

        <Content>
          <div className="title">About</div>
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
          <div className="title">Objectives</div>
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
          <div className="title">Outline</div>
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
        </Content>
      </PageContentContainer>
    </FullWidthContainer>
  );
}

export default memo(CourseDetail);
