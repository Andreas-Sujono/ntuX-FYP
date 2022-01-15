import React, { memo } from 'react';
import { PageContentContainer } from '../../shared/Shared.styles';
import { PaddedContainer } from '../LinkedinTemplate/shared.styles';
import UserSummarySection from './UserSummarySection';
import WebsiteTraffic from './WebsiteTraffic';
import CourseEnrolled from './CourseEnrolled';

const DefaultTemplate: React.FC<any> = ({ portfolio }: any) => {
  return (
    <div
      style={{
        background: 'white',
        paddingBottom: '0',
        margin: 0,
        padding: '0 !important',
      }}
    >
      <UserSummarySection data={portfolio.user} />
      <PageContentContainer>
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
    </div>
  );
};

export default memo(DefaultTemplate);
