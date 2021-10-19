import React, { memo } from 'react';
import { Author } from '../../../Models/Blog';
import { Container } from './Styles';

interface Props {
  author: Author;
}

function AuthorBlock({ author }: Props): React.ReactElement {
  const getProfileImage = (_author: Author) => {
    if (_author.profileImage) return <img src={_author.profileImage} />;
    return _author.name.slice(0, 1);
  };

  return (
    <Container className="common-author-block">
      <div className="author-image">{getProfileImage(author)}</div>
      <div className="author-name">{author.name}</div>
    </Container>
  );
}

export default memo(AuthorBlock);
