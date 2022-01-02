import React, { memo, useEffect } from 'react';
import { LeftChevronIcon } from 'react-dre/lib/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAllQuestions } from 'Store/Actions/forum';
import { selectQuestionsByTagId, selectTagById } from 'Store/Selector/forum';
import { mockQuestions } from '../../../Models/mockData';
import { routes } from '../../Routes';
import QuestionCard from '../QuestionsSection/QuestionCard';
import {
  Container,
  BackButton,
  Title,
  Subtitle,
  CardsContainer,
} from './Styles';

function QuestionsSection(): React.ReactElement {
  const dispatch = useDispatch();
  const { tagId } = useParams<any>();
  const tagDetail: any = useSelector(selectTagById)(tagId);
  const allQuestions = useSelector(selectQuestionsByTagId)[tagId] || [];

  useEffect(() => {
    dispatch(getAllQuestions(tagId));
  }, []);

  return (
    <Container>
      <BackButton>
        <Link to={routes.FORUM.TAGS}>
          <LeftChevronIcon className="icon" />
          Back to Tags
        </Link>
      </BackButton>
      <Title>Questions with tag {tagDetail.name}</Title>
      <Subtitle>{tagDetail.description}</Subtitle>

      <CardsContainer>
        {allQuestions.map((item) => (
          <QuestionCard key={item.question + item.description} summary={item} />
        ))}
      </CardsContainer>
    </Container>
  );
}

export default memo(QuestionsSection);
