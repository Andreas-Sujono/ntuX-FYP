import { Box, Button, Pagination } from '@mui/material';
import { routes } from 'Components/Routes';
import React, { memo } from 'react';
import { SearchBar } from 'react-dre/lib/SearchBar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const allQuestions = useSelector(selectAllQuestions);
  const unasweredQuestions = useSelector(selectUnansweredQuestions);
  const myQuestions = useSelector(selectMyQuestions);

  let selectedData = allQuestions;
  if (type === 'unanswered') selectedData = unasweredQuestions;
  else if (type === 'me') selectedData = myQuestions;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Container>
      <TitleRow>
        <Title>Questions</Title>
        <Link to={routes.FORUM.CREATE_QUESTION}>
          <Button variant="contained">Ask New Question</Button>
        </Link>
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
        {selectedData
          .slice(
            (page - 1) * rowsPerPage,
            (page - 1) * rowsPerPage + rowsPerPage,
          )
          .map((item) => (
            <QuestionCard key={item.id} summary={item} />
          ))}
      </CardsContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={Math.floor(selectedData.length / rowsPerPage) + 1}
          color="primary"
          onChange={handleChangePage}
          page={page}
        />
      </Box>
    </Container>
  );
}

export default memo(QuestionsSection);
