import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectPortfolioAllData } from '../../../Store/Selector/PortfolioSite/general';
import { PageContentContainer } from '../../shared/Shared.styles';
import UserSummarySection from './UserSummarySection';
import WorkExperienceSection from './WorkExperienceSection';
import EducationSection from './EducationSection';
import CertificationSection from './CertificationSection';
import ContributionSection from './ContributionSection';
import SkillsSection from './SkillsSection';

const DefaultTemplate: React.FC = () => {
  const allSiteData = useSelector(selectPortfolioAllData);
  return (
    // <div style={{ background: '#f3f2efba' }}>
    <PageContentContainer
      style={{ background: 'white', padding: 0, paddingBottom: '3em' }}
    >
      {allSiteData.map((item) => {
        const key = JSON.stringify(item);

        if (item.setting?.isHidden) return null;
        if (item.sectionName === 'userSummary')
          return <UserSummarySection data={item.data} key={key} />;

        if (item.sectionName === 'WorkExperiences')
          return <WorkExperienceSection data={item.data} key={key} />;

        if (item.sectionName === 'educations')
          return <EducationSection data={item.data} key={key} />;

        if (item.sectionName === 'certifications')
          return <CertificationSection data={item.data} key={key} />;

        if (item.sectionName === 'skills')
          return <SkillsSection data={item.data} key={key} />;

        // if (item.sectionName === 'siteContribution')
        //   return <ContributionSection data={item.data} key={key} />;

        return null;
      })}
    </PageContentContainer>
    // </div>
  );
};

export default memo(DefaultTemplate);
