import React, { memo } from 'react';
import { SearchBar } from 'react-dre/lib/SearchBar';
import { useHistory } from 'react-router-dom';
import Tag from '../../../common/Components/Tag';
import { mockTags } from '../../../Models/mockData';
import { routes, makePath } from '../../Routes';
import {
  Container,
  Title,
  Subtitle,
  SearchBarContainer,
  CardsContainer,
  TagCard,
} from './Styles';

function TagsSection(): React.ReactElement {
  const history = useHistory();
  const tagPath = (id: string) =>
    makePath(routes.FORUM.QUESTION_TAG, { tagId: id });

  return (
    <Container>
      <Title>Tags</Title>
      <Subtitle>Use tags to categorize your question</Subtitle>
      <SearchBarContainer>
        <SearchBar
          value=""
          onChange={() => null}
          width="100%"
          placeholder="Search for Tags"
        />
      </SearchBarContainer>
      <CardsContainer>
        {[...mockTags, ...mockTags, ...mockTags, ...mockTags, ...mockTags].map(
          (item) => (
            <TagCard
              key={item.id}
              onClick={() => history.push(tagPath(item.id))}
            >
              <Tag>{item.tag}</Tag>
              <div className="desc">{item.description}</div>
              <div className="question">
                {item.questionCount || 0} Questions
              </div>
            </TagCard>
          ),
        )}
      </CardsContainer>
    </Container>
  );
}

export default memo(TagsSection);
