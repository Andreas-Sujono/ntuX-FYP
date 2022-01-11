import React, { memo } from 'react';
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

function TagsSection(): React.ReactElement {
  const history = useHistory();
  const tagPath = (id: string) =>
    makePath(routes.FORUM.QUESTION_TAG, { tagId: id });
  const allTags = useSelector(selectAllTags);

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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
        {allTags
          .slice(
            (page - 1) * rowsPerPage,
            (page - 1) * rowsPerPage + rowsPerPage,
          )
          .map((item) => (
            <TagCard
              key={item.id}
              onClick={() => history.push(tagPath(item.id))}
            >
              <Tag>{item.name}</Tag>
              <div className="desc">{item.description}</div>
              <div className="question">{item.count || 0} Questions</div>
            </TagCard>
          ))}
      </CardsContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={Math.floor(allTags.length / rowsPerPage) + 1}
          color="primary"
          onChange={handleChangePage}
          page={page}
        />
      </Box>
    </Container>
  );
}

export default memo(TagsSection);
