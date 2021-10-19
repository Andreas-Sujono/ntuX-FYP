import React, { memo } from 'react';
import { AiOutlineLike as LikeIcon } from 'react-icons/ai';
import { Post, PostType } from 'Models/Feed';
import { User } from 'Models/Auth';
import {
  Container,
  PostAuthorContainer,
  BottomActionContainer,
  PostContent,
  BlogPostContent,
  QueryPostContent,
} from './Styles';
import ProfileImage from 'common/Components/ProfileImage';
import { BlogPreview } from 'Models/Blog';
import { QuestionSummary } from 'Models/Forum';

interface PostAuthorProps {
  user: User;
  postedDate: Date;
}
interface BottomActionProps {
  likes?: number;
}
interface BasicPostWidgetProps {
  post: Post;
}

export const PostAuthor: React.FC<PostAuthorProps> = ({
  user,
  postedDate,
}: PostAuthorProps) => {
  return (
    <PostAuthorContainer>
      <ProfileImage name={user.fullName} image={user.profileImage} />
      <div className="details">
        <div className="name">{user.fullName}</div>
        <div className="role">{user.role}</div>
        <div className="posted-date">{postedDate.toDateString()}</div>
      </div>
    </PostAuthorContainer>
  );
};

export const BottomAction: React.FC<BottomActionProps> = ({
  likes,
}: BottomActionProps) => {
  return (
    <BottomActionContainer>
      <div className="action">
        <LikeIcon className="icon" />
        Like {likes}
      </div>
    </BottomActionContainer>
  );
};

const BasicPostWidget: React.FC<BasicPostWidgetProps> = ({
  post,
}: BasicPostWidgetProps) => {
  const renderContent = () => {
    try {
      if (post.type === PostType.BLOG) {
        const blogPreview: BlogPreview = JSON.parse(post.post);
        return (
          <BlogPostContent>
            <strong>{post.user.fullName}</strong> has released a new blog. Check
            it out!
            <div className="blog-preview">
              <img src={blogPreview.thumbnail} alt="" />
              <div className="title">{blogPreview.title}</div>
              <div className="desc">{blogPreview.shortDescription}</div>
            </div>
          </BlogPostContent>
        );
      }

      if (post.type === PostType.QUERY) {
        const questionPreview: QuestionSummary = JSON.parse(post.post);
        return (
          <QueryPostContent>
            <strong>{post.user.fullName}</strong> asked a new question.
            <div className="query-preview">
              <div className="title">{questionPreview.question}</div>
              <div className="desc">{questionPreview.description}</div>
            </div>
          </QueryPostContent>
        );
      }

      return <PostContent>{post.post}</PostContent>;
    } catch (e) {
      return <PostContent>{post.post}</PostContent>;
    }
  };

  return (
    <Container>
      <PostAuthor user={post.user} postedDate={post.createdAt} />
      {renderContent()}
      <BottomAction />
    </Container>
  );
};

export default memo(BasicPostWidget);
