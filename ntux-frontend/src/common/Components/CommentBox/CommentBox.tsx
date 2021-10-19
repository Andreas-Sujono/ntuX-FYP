import React, { memo, useState } from 'react';
import { DownChevronIcon, UpChevronIcon } from 'react-dre/lib/Icon';
import { Comment } from '../../../Models/Blog';
import { shortenDateFormat } from '../../utils';
import AuthorBlock from '../AuthorBlock';
import { TextInput } from '../Input';
import {
  Container,
  MainBox,
  Row,
  VoteContainer,
  TextContainer,
  BottomRow,
  ReplyContainer,
} from './Styles';

interface Props {
  comment: Comment;
}

function CommentBox({ comment }: Props): React.ReactElement {
  const [commentInput, setCommentInput] = useState('');

  const renderReplyBox = (item: Comment) => {
    return (
      <ReplyContainer>
        {item.comment}{' '}
        <span className="author-name"> - {item.author.name}</span>,{' '}
        <span className="posted-date">{item.postedDate.toDateString()}</span>
      </ReplyContainer>
    );
  };

  return (
    <Container>
      <MainBox>
        <Row>
          {comment.enableVote && (
            <VoteContainer>
              <button>
                <UpChevronIcon />
              </button>
              <div>{comment.numberOfVotes || 0}</div>
              <button>
                <DownChevronIcon />
              </button>
            </VoteContainer>
          )}

          <TextContainer>{comment.comment}</TextContainer>
        </Row>
        <BottomRow>
          <div>
            <span>
              Posted {shortenDateFormat(comment.postedDate.getTime() / 1000)}{' '}
              ago
            </span>

            {!!comment.numberOfViews && (
              <span>Viewed {comment.numberOfViews} times</span>
            )}
            {comment.enableReply && <span>Reply comment</span>}
          </div>
          <AuthorBlock author={comment.author} />
        </BottomRow>
      </MainBox>
      {(comment.replies || []).map((item) => (
        <div key={item.comment}>
          {renderReplyBox(item)}
          <hr />
        </div>
      ))}
      {!!comment.replies?.length && (
        <ReplyContainer>
          <TextInput
            value={commentInput}
            placeholder="Add Comment"
            label=""
            onChange={(val) => setCommentInput(val)}
          />
        </ReplyContainer>
      )}
    </Container>
  );
}

export default memo(CommentBox);
