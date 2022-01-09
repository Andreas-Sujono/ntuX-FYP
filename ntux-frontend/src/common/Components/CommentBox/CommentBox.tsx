import React, { memo, useState } from 'react';
import { DownChevronIcon, UpChevronIcon } from 'react-dre/lib/Icon';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
import { Button, Divider, TextField } from '@mui/material';
import { useThunkDispatch } from 'common/hooks';
import {
  createAnswer,
  deleteAnswer,
  getOneQuestion,
  updateAnswer,
} from 'Store/Actions/forum';
import { useSelector } from 'react-redux';
import { selectUser } from 'Store/Selector/auth';
import { toast } from 'react-toastify';
import { Role } from 'Models/Auth';

interface Props {
  data: any;
  questionData: any;
}

function AnswerDetailBox({ data, questionData }: Props): React.ReactElement {
  const [commentInput, setCommentInput] = useState('');
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentInput, setEditCommentInput] = useState('');
  const [editAnswerId, setEditAnswerId] = useState(null);
  const [editAnswerInput, setEditAnswerInput] = useState('');

  const user = useSelector(selectUser) || {};

  const dispatch = useThunkDispatch();

  const renderReplyBox = (item: any) => {
    if (item.id === editCommentId)
      return (
        <ReplyContainer>
          <TextInput
            value={editCommentInput}
            placeholder="Add Comment"
            label=""
            onChange={(val) => setEditCommentInput(val)}
          />
          <Button
            variant="contained"
            sx={{ mt: 1 }}
            onClick={() => handleEditReply(item)}
            disabled={loading}
          >
            Edit
          </Button>
          <Button
            sx={{ mt: 1 }}
            onClick={() => {
              setEditCommentInput('');
              setEditCommentId(null);
            }}
          >
            Cancel
          </Button>
        </ReplyContainer>
      );
    return (
      <ReplyContainer>
        {item.description}{' '}
        <span className="author-name"> By {item.user.fullName}</span>
        <span className="posted-date">
          ,&nbsp;
          {shortenDateFormat(new Date(item.createdAt).getTime() / 1000)} Ago
        </span>
        &nbsp;&nbsp;
        {user.id === item.user.id && (
          <>
            <span
              className="action edit-action"
              onClick={() => {
                setEditCommentId(item.id);
                setEditCommentInput(item.description);
              }}
            >
              <EditIcon fontSize="small" color="primary" />
            </span>
            &nbsp;&nbsp;
            <span
              className="action delete-action"
              onClick={() => handleDelete(item.id)}
            >
              <DeleteIcon fontSize="small" color="primary" />
            </span>
          </>
        )}
      </ReplyContainer>
    );
  };

  const handleReply = async () => {
    const resData = {
      metadata: '',
      tags: [],
      description: commentInput,
      name: commentInput,
      parentAnswer: data.id,
      question: questionData.id,
    };
    setLoading(true);
    const res = await dispatch(createAnswer(resData));
    await dispatch(getOneQuestion(data.id));

    setIsAddingComment(false);
    setCommentInput('');
    setLoading(false);
  };

  const handleEditReply = async (item: any) => {
    const resData = {
      id: item.id,
      ...item,
      description: editCommentInput,
      name: editCommentInput,
    };
    setLoading(true);
    const res = await dispatch(updateAnswer(resData));
    await dispatch(getOneQuestion(data.id));

    setEditCommentId(null);
    setEditCommentInput('');
    setLoading(false);
  };

  const handleEdit = async () => {
    const resData = {
      id: data.id,
      ...data,
      description: editAnswerInput,
      name: editAnswerInput,
    };
    setLoading(true);
    const res = await dispatch(updateAnswer(resData));
    await dispatch(getOneQuestion(questionData.id));

    setEditAnswerId(null);
    setEditAnswerInput('');
    setLoading(false);
  };

  const handleDelete = async (id?: number) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this Answer?',
    );
    if (!confirm) return;

    const res = await dispatch(
      deleteAnswer({
        id: id || data.id,
      }),
    );
    if (res.result && !id) {
      toast.success('Answer deleted successfully');
    }

    await dispatch(getOneQuestion(questionData.id));
  };

  if (editAnswerId)
    return (
      <Container>
        <TextField
          required
          fullWidth
          id="answer"
          label="Asnwer"
          type="textarea"
          name="answer"
          rows={6}
          multiline
          value={editAnswerInput}
          onChange={(e) => setEditAnswerInput(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ mt: 1 }}
          onClick={handleEdit}
          disabled={loading}
        >
          Edit
        </Button>
        <Button
          sx={{ mt: 1 }}
          onClick={() => {
            setEditAnswerInput('');
            setEditAnswerId(null);
          }}
        >
          Cancel
        </Button>
      </Container>
    );

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

            {user?.id === data.user?.id && (
              <span
                style={{ cursor: 'pointer', color: '#ae1b1b' }}
                onClick={() => {
                  setEditAnswerId(data.id);
                  setEditAnswerInput(data.description);
                }}
              >
                Edit
              </span>
            )}
            {((user?.id && user?.id === data.user?.id) ||
              user?.role === Role.ADMIN) && (
              <span
                style={{ cursor: 'pointer', color: '#ae1b1b' }}
                onClick={() => handleDelete()}
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
          <Button
            variant="contained"
            sx={{ mt: 1 }}
            onClick={handleReply}
            disabled={loading}
          >
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
