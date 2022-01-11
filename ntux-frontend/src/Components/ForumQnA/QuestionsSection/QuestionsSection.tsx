import { Box, Button, Pagination } from '@mui/material';
import { useThunkDispatch } from 'common/hooks';
import { searchFromListOfObject } from 'common/utils';
import { routes } from 'Components/Routes';
import React, { memo, useRef } from 'react';
import { SearchBar } from 'react-dre/lib/SearchBar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllQuestions, getUnansweredQuestions } from 'Store/Actions/forum';
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
  const [searchInput, setSearchInput] = React.useState('');
  const [searchResult, setSearchResult] = React.useState<any>([]);

  const allQuestions = useSelector(selectAllQuestions);
  const unasweredQuestions = useSelector(selectUnansweredQuestions);
  const myQuestionsReceived = useSelector(selectMyQuestions);
  const myQuestions =
    type === 'me' && searchInput ? searchResult : myQuestionsReceived;

  const dispatch = useThunkDispatch();

  let selectedData = allQuestions;
  if (type === 'unanswered') selectedData = unasweredQuestions;
  else if (type === 'me') selectedData = myQuestions;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const ref = useRef<any>(null);

  const onSearch = (value) => {
    setSearchInput(value);

    if (ref.current) clearTimeout(ref.current);

    ref.current = setTimeout(async () => {
      if (type === 'all') await dispatch(getAllQuestions(undefined, value));
      if (type === 'unanswered') await dispatch(getUnansweredQuestions(value));
      if (type === 'me') {
        const result = searchFromListOfObject(
          myQuestionsReceived,
          ['name'],
          value,
        );
        setSearchResult(result);
      }
      ref.current = null;
    }, 200);
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
          value={searchInput}
          onChange={onSearch}
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
