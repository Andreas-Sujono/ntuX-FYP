import React, { memo } from 'react';
import { SearchBar } from 'react-dre/lib/SearchBar';
import { mockJobs, mockJobDetail } from '../../../Models/mockData/job';
import JobDetails from './JobDetails';
import {
  BackgroundContainer,
  TopContainer,
  SearchBarContainer,
  Title,
  ContentRow,
  LeftSection,
  JobCard,
  RightSection,
} from './Styles';

const MainPage: React.FC = () => {
  return (
    <>
      <BackgroundContainer>
        <TopContainer>
          <Title>Find Your Dream Job</Title>
          <SearchBarContainer>
            <SearchBar
              value=""
              onChange={() => null}
              width="100%"
              placeholder="Search Jobs"
            />
          </SearchBarContainer>
          <img src={process.env.PUBLIC_URL + '/assets/LP/resume.svg'} />
        </TopContainer>
      </BackgroundContainer>

      <ContentRow>
        <LeftSection>
          {mockJobs.map((item) => (
            <JobCard key={item.id}>
              <div className="dt-row">
                <img src={item.companyLogo} className="company-logo" />
                <div className="job-detail">
                  <div className="job-role">{item.roleName}</div>
                  <div className="company-name">{item.companyName}</div>
                  <div className="posted-date">
                    Posted on {item.postedDate.toDateString()}
                  </div>
                </div>
              </div>
            </JobCard>
          ))}
        </LeftSection>
        <RightSection>
          <JobDetails jobDetail={mockJobDetail} />
        </RightSection>
      </ContentRow>
    </>
  );
};

export default memo(MainPage);
