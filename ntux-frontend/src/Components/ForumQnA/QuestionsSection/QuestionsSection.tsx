import { Button } from '@mui/material';
import React, { memo } from 'react';
import { SearchBar } from 'react-dre/lib/SearchBar';
import { useSelector } from 'react-redux';
import {
  selectAllQuestions,
  selectMyQuestions,
  selectUnansweredQuestions,
} from 'Store/Selector/forum';
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
  const [type, setType] = React.useState('all');
  const allQuestions = useSelector(selectAllQuestions);
  const unasweredQuestions = useSelector(selectUnansweredQuestions);
  const myQuestions = useSelector(selectMyQuestions);

  let selectedData = allQuestions;
  if (type === 'unanswered') selectedData = unasweredQuestions;
  else if (type === 'me') selectedData = myQuestions;

  return (
    <Container>
      <TitleRow>
        <Title>Questions</Title>
        <Button variant="contained">Ask New Question</Button>
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
        <span
          className={type === 'all' ? 'active' : ''}
          onClick={() => setType('all')}
        >
          Recent
        </span>
        <span
          className={type === 'unanswered' ? 'active' : ''}
          onClick={() => setType('unanswered')}
        >
          Unanswered
        </span>
        <span
          className={type === 'me' ? 'active' : ''}
          onClick={() => setType('me')}
        >
          My Question
        </span>
      </FilterContainer>
      <CardsContainer>
        {selectedData.length === 0 && (
          <span style={{ color: 'lightgrey' }}>No Data</span>
        )}
        {selectedData.map((item) => (
          <QuestionCard key={item.question + item.description} summary={item} />
        ))}
      </CardsContainer>
    </Container>
  );
}

export default memo(QuestionsSection);
