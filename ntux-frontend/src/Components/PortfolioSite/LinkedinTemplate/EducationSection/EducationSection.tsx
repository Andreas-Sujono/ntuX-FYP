import React, { memo } from 'react';
import { Education } from '../../../../Models/PortfolioSite';
import { SectionTitle } from '../shared.styles';
import { Container, Content, Card, LeftCard, RightCard } from './Styles';

interface Props {
  data: Education[];
}

const EducationSection: React.FC<Props> = ({ data }: Props) => {
  return (
    <Container>
      <Content>
        <SectionTitle>Education</SectionTitle>
        {data.map((item: Education) => (
          <Card key={item.id}>
            <LeftCard>
              <img src={item.schoolLogo} />
            </LeftCard>
            <RightCard>
              <div className="name">{item.schoolName}</div>
              <div className="role">
                {item.degree} - {item.fieldOfStudy} - Grade: {item.grade}
              </div>
              <div className="period">{item.startDate.toDateString()}</div>
              <div className="desc">{item.description}</div>
            </RightCard>
          </Card>
        ))}
      </Content>
    </Container>
  );
};

export default memo(EducationSection);
