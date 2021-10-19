import React, { memo } from 'react';
import CommentBox from '../../../../common/Components/CommentBox';
import { mockComments } from '../../../../Models/mockData';
import { Container, Title } from './Styles';

function CommentSection(): React.ReactElement {
  return (
    <Container className="cw-2">
      <Title>Comments ({mockComments.length})</Title>
      {mockComments.map((item) => (
        <CommentBox comment={item} key={item.comment} />
      ))}
    </Container>
  );
}

export default memo(CommentSection);
