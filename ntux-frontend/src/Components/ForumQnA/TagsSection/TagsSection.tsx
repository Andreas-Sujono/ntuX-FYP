import React, { memo, useRef } from 'react';
import { SearchBar } from 'react-dre/lib/SearchBar';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectAllTags } from 'Store/Selector/forum';
import Tag from '../../../common/Components/Tag';
import { Box, Pagination } from '@mui/material';
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
import { searchFromListOfObject } from 'common/utils';

function TagsSection(): React.ReactElement {
  const history = useHistory();
  const tagPath = (id: string) =>
    makePath(routes.FORUM.QUESTION_TAG, { tagId: id });
  const allTags = useSelector(selectAllTags);

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchInput, setSearchInput] = React.useState('');
  const [searchResult, setSearchResult] = React.useState<any>([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const ref = useRef<any>(null);

  const onChange = (value: any) => {
    setSearchInput(value);

    if (ref.current) clearTimeout(ref.current);

    ref.current = setTimeout(() => {
      const result = searchFromListOfObject(allTags, ['name'], value);
      setSearchResult(result);
      ref.current = null;
    }, 300);
  };

  const final = searchInput ? searchResult : allTags;

  return (
    <Container>
      <Title>Tags</Title>
      <Subtitle>Use tags to categorize your question</Subtitle>
      <SearchBarContainer>
        <SearchBar
          value={searchInput}
          onChange={onChange}
          width="100%"
          placeholder="Search for Tags"
        />
      </SearchBarContainer>
      <CardsContainer>
        {final
          .slice(
            (page - 1) * rowsPerPage,
            (page - 1) * rowsPerPage + rowsPerPage,
          )
          .map((item) => (
            <TagCard
              key={item.id}
              onClick={() => history.push(tagPath(item.id))}
            >
              <Tag color={item.color}>{item.name}</Tag>
              <div className="desc">{item.description}</div>
              <div className="question">{item.count || 0} Questions</div>
            </TagCard>
          ))}
      </CardsContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={Math.floor(final.length / rowsPerPage) + 1}
          color="primary"
          onChange={handleChangePage}
          page={page}
        />
      </Box>
    </Container>
  );
}

export default memo(TagsSection);
