import React, { memo } from 'react';
import { SearchBar } from 'react-dre/lib/SearchBar';
import { PrimaryButton } from '../../../common/Components/Button';
import { mockQuestions } from '../../../Models/mockData';
import QuestionCard from './QuestionCard';
import {
  Container,
  TitleRow,
  Title,
  SearchBarContainer,
  FilterContainer,
  CardsContainer,
} from './Styles';

function QuestionsSection(): React.ReactElement {
  return (
    <Container>
      <TitleRow>
        <Title>Questions</Title>
        <PrimaryButton>Ask New Question</PrimaryButton>
      </TitleRow>
      <SearchBarContainer>
        <SearchBar
          value=""
          onChange={() => null}
          width="100%"
          placeholder="Search for any question or topic"
        />
      </SearchBarContainer>
      <FilterContainer>
        <span>Recent</span>
        <span>Unanswered</span>
        <span>My Question</span>
      </FilterContainer>
      <CardsContainer>
        {mockQuestions.map((item) => (
          <QuestionCard key={item.question + item.description} summary={item} />
        ))}
      </CardsContainer>
    </Container>
  );
}

export default memo(QuestionsSection);
