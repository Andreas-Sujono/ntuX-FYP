import { Button, TextField, Typography } from '@mui/material';
import QuestionDetailBox from 'common/Components/QuestionDetailBox';
import { useThunkDispatch } from 'common/hooks';
import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createAnswer, getOneQuestion } from 'Store/Actions/forum';
import { selectQuestionDetailById } from 'Store/Selector/forum';
import CommentBox from '../../../common/Components/CommentBox';
import Tag from '../../../common/Components/Tag';
import {
  mockQuestion,
  mockComments as mockSolutions,
} from '../../../Models/mockData';
import { Container, Title, TagsContainer, CardsContainer } from './Styles';

function QuestionsSection(): React.ReactElement {
  const questionComment = mockQuestion;
  questionComment.comment = questionComment.description;
  const dispatch = useThunkDispatch();
  const { questionId } = useParams<any>();

  const [loading, setLoading] = useState(false);
  const [answerInput, setAnswerInput] = useState('');

  const questionDetail =
    useSelector(selectQuestionDetailById)[questionId] || {};

  useEffect(() => {
    dispatch(getOneQuestion(questionId));
  }, []);

  const submitAnswer = async () => {
    if (!answerInput) return;
    setLoading(true);
    const res = await dispatch(
      createAnswer({
        question: questionId,
        description: answerInput,
        name: answerInput,
        metadata: {},
      }),
    );
    if (res.result) setAnswerInput('');
    setLoading(false);
  };

  return (
    <Container>
      <Title>{questionDetail.name}</Title>
      <TagsContainer>
        {questionDetail.tags?.map((item) => (
          <Tag key={item.id}>{item.name}</Tag>
        ))}
      </TagsContainer>
      <QuestionDetailBox data={questionDetail as any} />
      <CardsContainer>
        <div className="title">
          Answers ({questionDetail.answers?.length || 0})
        </div>
        {questionDetail.answers?.map((item) => (
          <CommentBox key={item.id} data={item} />
        ))}
        <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
          Give Your Answer
        </Typography>
        <TextField
          required
          fullWidth
          id="answer"
          label="Asnwer"
          type="textarea"
          name="answer"
          rows={6}
          multiline
          value={answerInput}
          onChange={(e) => setAnswerInput(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ mt: 1 }}
          onClick={submitAnswer}
          disabled={loading}
        >
          Submit
        </Button>
        {/* <Button sx={{ mt: 1 }}>Cancel</Button> */}
      </CardsContainer>
    </Container>
  );
}

export default memo(QuestionsSection);
