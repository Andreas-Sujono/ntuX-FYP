import React, { memo } from 'react';
import moment from 'moment';
import { SectionTitle } from '../shared.styles';
import { Container, Content, Card, LeftCard, RightCard } from './Styles';

interface Props {
  data: any;
}

const EducationSection: React.FC<Props> = ({ data }: Props) => {
  if (!data.length) return null;

  return (
    <Container>
      <Content>
        <SectionTitle>Education</SectionTitle>
        {data.map((item: any) => (
          <Card key={item.schoolName + item.description}>
            {/* <LeftCard>
              <img src={item.schoolLogo} />
            </LeftCard> */}
            <RightCard>
              <div className="name">{item.school}</div>
              <div className="role">
                {item.degree} - {item.fieldOfStudy}
                {/* - Grade: {item.grade} */}
              </div>
              <div className="period">
                {moment(item.startDate || new Date()).format('MMMM YYYY')}
                &nbsp;-&nbsp;
                {moment(item.endDate || new Date()).format('MMMM YYYY')}
              </div>
              <div className="desc">{item.description}</div>
            </RightCard>
          </Card>
        ))}
      </Content>
    </Container>
  );
};

export default memo(EducationSection);
