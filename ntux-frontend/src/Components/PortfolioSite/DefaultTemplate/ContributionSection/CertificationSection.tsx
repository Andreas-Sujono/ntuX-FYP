import React, { memo } from 'react';
import { SiteContribution } from '../../../../Models/PortfolioSite';
import { SectionTitle } from '../shared.styles';
import { Container, Content, LeftSection, RightSection, Card } from './Styles';

interface Props {
  data: SiteContribution;
}

const ContributionSection: React.FC<Props> = ({ data }: Props) => {
  return (
    <Container>
      <Content>
        <LeftSection>
          <SectionTitle>Contribution to Forum</SectionTitle>
        </LeftSection>
        <RightSection>
          <Card>
            <div className="title">Total Blogs:</div>
            <div className="count">
              <span>{data.blogCount}</span> Blogs written
            </div>
          </Card>
          <Card>
            <div className="title">Total Question:</div>
            <div className="count">
              <span>{data.questionCount}</span> Question asked
            </div>
          </Card>
          <Card>
            <div className="title">Total Answer:</div>
            <div className="count">
              <span>{data.solutionCount}</span> Answer provided
            </div>
          </Card>
        </RightSection>
      </Content>
    </Container>
  );
};

export default memo(ContributionSection);
