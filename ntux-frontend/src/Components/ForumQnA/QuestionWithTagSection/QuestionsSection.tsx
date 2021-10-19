import React, { memo } from 'react';
import { LeftChevronIcon } from 'react-dre/lib/Icon';
import { Link } from 'react-router-dom';
import { mockQuestions } from '../../../Models/mockData';
import { routes } from '../../Routes';
import QuestionCard from '../QuestionsSection/QuestionCard';
import {
  Container,
  BackButton,
  Title,
  Subtitle,
  CardsContainer,
} from './Styles';

function QuestionsSection(): React.ReactElement {
  const tagName = 'HTML';
  const tagDesc =
    'lI’m trying to deploy a server written in NodeJs, I want to host it online and found out that Heroku is the best option for it. How to deploy it by using command line only. I want to host it online and found out that Heroku is the best option for it. I want to host it online and found out that Heroku is the best option for it';
  return (
    <Container>
      <BackButton>
        <Link to={routes.FORUM.TAGS}>
          <LeftChevronIcon className="icon" />
          Back to Tags
        </Link>
      </BackButton>
      <Title>Questions with tag {tagName}</Title>
      <Subtitle>{tagDesc}</Subtitle>

      <CardsContainer>
        {mockQuestions.map((item) => (
          <QuestionCard key={item.question + item.description} summary={item} />
        ))}
      </CardsContainer>
    </Container>
  );
}

export default memo(QuestionsSection);
