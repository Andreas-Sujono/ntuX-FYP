import React, { memo } from 'react';
import { PageContentContainer } from '../../shared/Shared.styles';
import { PaddedContainer } from '../LinkedinTemplate/shared.styles';
import UserSummarySection from './UserSummarySection';
import WebsiteTraffic from './WebsiteTraffic';
import CourseEnrolled from './CourseEnrolled';

const DefaultTemplate: React.FC<any> = ({ portfolio }: any) => {
  return (
    <PageContentContainer
      style={{ background: 'white', padding: 0, paddingBottom: '3em' }}
    >
      <UserSummarySection data={portfolio.user} />
      <PaddedContainer>
        {!!portfolio.registeredCourses?.length && (
          <CourseEnrolled
            data={portfolio.registeredCourses || []}
            sx={{ mb: 3 }}
          />
        )}

        <WebsiteTraffic data={portfolio.studentSummary || []} interval="w" />
      </PaddedContainer>
    </PageContentContainer>
  );
};

export default memo(DefaultTemplate);
