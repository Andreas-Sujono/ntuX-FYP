import React, { memo } from 'react';
import CommentBox from '../../../common/Components/CommentBox';
import Tag from '../../../common/Components/Tag';
import {
  mockQuestion,
  mockComments as mockSolutions,
} from '../../../Models/mockData';
import { Container, Title, TagsContainer, CardsContainer } from './Styles';

function QuestionsSection(): React.ReactElement {
  const questionComment = mockQuestion;
  questionComment.comment = questionComment.description;

  return (
    <Container>
      <Title>{questionComment.question}</Title>
      <TagsContainer>
        {questionComment.tags.map((item) => (
          <Tag key={item.id}>{item.tag}</Tag>
        ))}
      </TagsContainer>
      <CommentBox comment={questionComment as any} />
      <CardsContainer>
        <div className="title">Answers ({mockSolutions.length})</div>
        {mockSolutions.map((item) => (
          <CommentBox key={item.id} comment={item} />
        ))}
      </CardsContainer>
    </Container>
  );
}

export default memo(QuestionsSection);
