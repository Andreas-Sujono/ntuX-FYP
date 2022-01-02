import React, { memo, useState } from 'react';
import { DownChevronIcon, UpChevronIcon } from 'react-dre/lib/Icon';
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
import { Button, Divider } from '@mui/material';

interface Props {
  data: any;
}

function AnswerDetailBox({ data }: Props): React.ReactElement {
  const [commentInput, setCommentInput] = useState('');
  const [isAddingComment, setIsAddingComment] = useState(false);

  const renderReplyBox = (item: any) => {
    return (
      <ReplyContainer>
        {item.description}{' '}
        <span className="author-name"> By {item.user.fullName}</span>
        <span className="posted-date">
          ,&nbsp;
          {shortenDateFormat(new Date(item.createdAt).getTime() / 1000)} Ago
        </span>
      </ReplyContainer>
    );
  };

  return (
    <Container>
      <MainBox>
        <Row>
          {data.enableVote && (
            <VoteContainer>
              <button>
                <UpChevronIcon />
              </button>
              <div>{data.upvote || 0}</div>
              <button>
                <DownChevronIcon />
              </button>
            </VoteContainer>
          )}

          <TextContainer>{data.description}</TextContainer>
        </Row>
        <BottomRow>
          <div>
            <span>
              Posted{' '}
              {shortenDateFormat(new Date(data.createdAt).getTime() / 1000)} ago
            </span>

            <span
              style={{ cursor: 'pointer', color: '#ae1b1b' }}
              onClick={() => setIsAddingComment(!isAddingComment)}
            >
              Reply comment
            </span>
          </div>
          <AuthorBlock
            author={{
              name: data.user?.fullName || '',
              profileImage: data.user?.currentAvatar?.imageUrl || '',
            }}
          />
        </BottomRow>
      </MainBox>
      {(data.childrenAnswers || []).map((item) => (
        <div key={item.id}>
          {renderReplyBox(item)}
          <Divider />
        </div>
      ))}
      {isAddingComment && (
        <ReplyContainer>
          <TextInput
            value={commentInput}
            placeholder="Add Comment"
            label=""
            onChange={(val) => setCommentInput(val)}
          />
          <Button variant="contained" sx={{ mt: 1 }}>
            Reply
          </Button>
          <Button sx={{ mt: 1 }} onClick={() => setIsAddingComment(false)}>
            Cancel
          </Button>
        </ReplyContainer>
      )}
    </Container>
  );
}

export default memo(AnswerDetailBox);
