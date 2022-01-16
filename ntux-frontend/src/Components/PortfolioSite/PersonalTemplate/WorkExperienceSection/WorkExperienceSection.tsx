import React, { memo } from 'react';
import moment from 'moment';
import { SectionTitle } from '../shared.styles';
import {
  Container,
  Content,
  WorkCard,
  WorkLeftCard,
  WorkRightCard,
} from './Styles';

interface Props {
  data: any;
}

const WorkExperienceSection: React.FC<Props> = ({ data }: Props) => {
  if (!data.length) return null;
  return (
    <Container>
      <Content>
        <SectionTitle>Work Experience</SectionTitle>
        {data.map((item: any) => (
          <WorkCard key={item.companyName + item.title}>
            <WorkLeftCard>
              {/* <img src={item.companyLogo} /> */}
              <div className="name">{item.companyName}</div>
              <div className="role">{item.title}</div>
              <div className="period">
                {moment(item.startDate || new Date()).format('MMMM YYYY')}
                &nbsp;-&nbsp;
                {item.endDate
                  ? moment(item.endDate || new Date()).format('MMMM YYYY')
                  : 'Present'}
              </div>
            </WorkLeftCard>
            <WorkRightCard>{item.description}</WorkRightCard>
          </WorkCard>
        ))}
      </Content>
    </Container>
  );
};

export default memo(WorkExperienceSection);
