import React, { memo } from 'react';
import { Skill } from '../../../../Models/PortfolioSite';
import { Container, Content, TagsContainer } from './Styles';
import { SectionTitle } from '../shared.styles';
import Tag from '../../../../common/Components/Tag';

interface Props {
  data: Skill[];
}

const SkillsSection: React.FC<Props> = ({ data }: Props) => {
  return (
    <Container>
      <Content>
        <SectionTitle>Skills</SectionTitle>
        <TagsContainer>
          {data.map((item) => (
            <Tag key={item.id}>{item.name}</Tag>
          ))}
        </TagsContainer>
      </Content>
    </Container>
  );
};

export default memo(SkillsSection);
