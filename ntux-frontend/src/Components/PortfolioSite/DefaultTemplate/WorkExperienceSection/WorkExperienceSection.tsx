import React, { memo } from 'react';
import { WorkExperience } from '../../../../Models/PortfolioSite';
import { SectionTitle } from '../shared.styles';
import {
  Container,
  Content,
  WorkCard,
  WorkLeftCard,
  WorkRightCard,
} from './Styles';

interface Props {
  data: WorkExperience[];
}

const WorkExperienceSection: React.FC<Props> = ({ data }: Props) => {
  return (
    <Container>
      <Content>
        <SectionTitle>Work Experience</SectionTitle>
        {data.map((item: WorkExperience) => (
          <WorkCard key={item.id}>
            <WorkLeftCard>
              <img src={item.companyLogo} />
              <div className="name">{item.companyName}</div>
              <div className="role">{item.role}</div>
              <div className="period">{item.startDate.toDateString()}</div>
            </WorkLeftCard>
            <WorkRightCard>
              <ul>
                {item.description.split('\n').map((desc) => (
                  <li key={desc}>{desc}</li>
                ))}
              </ul>
            </WorkRightCard>
          </WorkCard>
        ))}
      </Content>
    </Container>
  );
};

export default memo(WorkExperienceSection);
