import styled from 'styled-components';

export const Container = styled.div`
  background: white;
  padding: 16px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.09);
  margin-bottom: 1em;
  max-width: 530px;
`;

export const PostAuthorContainer = styled.div`
  display: flex;
  align-items: flex-start;
  .details {
    margin-left: 6px;
    .name {
      font-weight: bold;
      font-size: 16px;
    }
    .role {
      font-size: 14px;
      margin-top: 2px;
    }
    .posted-date {
      font-size: 12px;
      line-height: 14px;
      color: #6f6f6f;
      margin-top: 2px;
    }
  }
`;

export const BottomActionContainer = styled.div`
  margin-top: 18px;
  padding-top: 8px;
  border-top: 1px solid #dcdcdc;

  .action {
    color: #6f6f6f;
    font-size: 14px;
    margin-right: 1em;
    display: flex;
    align-items: center;
    cursor: pointer;

    .icon {
      width: 24px;
      height: 24px;
      margin-right: 6px;
    }
  }
`;

export const PostContent = styled.div`
  font-size: 15px;
  margin-top: 18px;
`;

export const BlogPostContent = styled(PostContent)`
  .blog-preview {
    border: 1px solid #cecece;
    box-sizing: border-box;
    border-radius: 12px;
    padding: 16px;
    margin-top: 1em;
    cursor: pointer;

    img {
      width: 80%;
      max-height: 200px;
      object-fit: cover;
      border-radius: 8px;
    }

    .title {
      font-weight: bold;
      font-size: 20px;
      margin-top: 12px;
    }
    .desc {
      font-size: 14px;
      color: #6f6f6f;
      margin-top: 6px;
    }
  }
`;

export const QueryPostContent = styled(PostContent)`
  .query-preview {
    border: 1px solid #cecece;
    box-sizing: border-box;
    border-radius: 12px;
    padding: 16px;
    margin-top: 1em;
    cursor: pointer;

    .title {
      font-weight: bold;
      font-size: 22px;
    }
    .desc {
      font-size: 14px;
      color: #6f6f6f;
      margin-top: 6px;
    }
  }
`;
