import React, { memo, useState } from 'react';
import { DownChevronIcon, UpChevronIcon } from 'react-dre/lib/Icon';
import { makePath, shortenDateFormat } from '../../utils';
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
import EditorShower from '../EditorShower';
import { selectUser } from 'Store/Selector/auth';
import { useSelector } from 'react-redux';
import { Role } from 'Models/Auth';
import { useThunkDispatch } from 'common/hooks';
import { toast } from 'react-toastify';
import { routes } from 'Components/Routes';
import { useHistory } from 'react-router-dom';
import { deleteQuestion } from 'Store/Actions/forum';

interface Props {
  data: any;
}

function QuestionDetailBox({ data }: Props): React.ReactElement {
  const [commentInput, setCommentInput] = useState('');
  const [isAddingComment, setIsAddingComment] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useThunkDispatch();
  const history = useHistory();

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

  const handleEdit = () => {
    history.push(
      makePath(routes.FORUM.UPDATE_QUESTION, { questionId: data.id }),
    );
  };

  const handleDelete = async () => {
    const confirm = window.confirm(
      'Are you sure you want to delete this question?',
    );
    if (!confirm) return;

    const res = await dispatch(
      deleteQuestion({
        id: data.id,
      }),
    );
    if (res.result) {
      toast.success('Question deleted successfully');
      return history.push(routes.FORUM.QUESTIONS);
    }
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

          <EditorShower
            pid={data?.id}
            blocks={data?.metadata?.length ? data.metadata : []}
            handleUpdate={() => null}
            isDisabled
          />

          {/* <TextContainer>{data.description}</TextContainer> */}
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
              Reply Question
            </span>
            {user?.id === data.user?.id && (
              <span
                style={{ cursor: 'pointer', color: '#ae1b1b' }}
                onClick={handleEdit}
              >
                Edit
              </span>
            )}
            {((user?.id && user?.id === data.user?.id) ||
              user?.role === Role.ADMIN) && (
              <span
                style={{ cursor: 'pointer', color: '#ae1b1b' }}
                onClick={handleDelete}
              >
                Delete
              </span>
            )}
          </div>
          <AuthorBlock
            author={{
              name: data.user?.fullName || '',
              profileImage: data.user?.currentAvatar?.imageUrl || '',
            }}
          />
        </BottomRow>
      </MainBox>
      {(data.childrenQuestions || []).map((item) => (
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

export default memo(QuestionDetailBox);
