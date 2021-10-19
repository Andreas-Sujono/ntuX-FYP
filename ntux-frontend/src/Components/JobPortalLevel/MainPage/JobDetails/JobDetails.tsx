import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { PrimaryButton } from '../../../../common/Components/Button';
import { JobDetail } from '../../../../Models/Job';
import { Container, TopSection, Description } from './Styles';

interface Props {
  jobDetail: JobDetail;
}

const JobDetails: React.FC<Props> = ({
  jobDetail,
}: {
  jobDetail: JobDetail;
}) => {
  return (
    <Container>
      <TopSection>
        <div className="left-section">
          <img src={jobDetail.companyLogo} />
          <div className="company-name">{jobDetail.companyName}</div>
          <div className="role-name">{jobDetail.roleName}</div>
          <div className="role-type">{jobDetail.roleType}</div>
          {/* <div className="posted-date">
            Posted on {jobDetail.postedDate.toDateString()}
          </div> */}
        </div>
        <div className="right-section">
          <PrimaryButton color="#2E3C85" style={{ width: '225px' }}>
            Apply
          </PrimaryButton>
        </div>
      </TopSection>
      <Description>
        <ReactMarkdown>{jobDetail.description}</ReactMarkdown>
      </Description>
    </Container>
  );
};

export default memo(JobDetails);
