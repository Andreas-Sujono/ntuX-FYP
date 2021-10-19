import React, { memo } from 'react';
import { Author } from '../../../../Models/Blog';
import {
  Container,
  AuthorImage,
  Content,
  ShareContainer,
  StyledButton,
} from './Styles';

interface Props {
  author: Author;
}

function AuthorDetail({ author }: Props): React.ReactElement {
  const getProfileImage = (_author: Author) => {
    if (_author.profileImage) return <img src={_author.profileImage} />;
    return _author.name.slice(0, 1);
  };

  return (
    <Container className="cw-2">
      <AuthorImage>{getProfileImage(author)}</AuthorImage>
      <Content>
        <div>
          <div className="written-by">Written by</div>
          <div className="author-name">{author.name} Sujono</div>
          <div className="author-desc">
            {author.description} Adipiscing bibendum est ultricies integer.
            Turpis tincidunt id aliquet risus feugiat in ante metus dictum. Eget
            dolor morbi non arcu risus quis varius quam quisque.
          </div>
        </div>
        <StyledButton>Follow</StyledButton>
      </Content>
      <ShareContainer>Share</ShareContainer>
    </Container>
  );
}

export default memo(AuthorDetail);
