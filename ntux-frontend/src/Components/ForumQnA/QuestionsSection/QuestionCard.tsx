import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import AuthorBlock from '../../../common/Components/AuthorBlock';
import Tag from '../../../common/Components/Tag';
import { makePath, shortenDateFormat } from '../../../common/utils';
import { QuestionSummary } from '../../../Models/Forum';
import { routes } from '../../Routes';
import { Card, CardTopRow, CardBottomRow } from './Styles';

function QuestionCard({
  summary,
}: {
  summary: QuestionSummary;
}): React.ReactElement {
  const history = useHistory();
  const questionPath = makePath(routes.FORUM.QUESTION_DETAIL, {
    questionId: summary.id,
  });

  return (
    <Card onClick={() => history.push(questionPath)}>
      <CardTopRow>
        <div className="left-section">
          <div className="title">{summary.question}</div>
          <div className="subtitle">{summary.description}</div>
        </div>
        <div className="right-section">
          <div>
            Posted {shortenDateFormat(summary.postedDate.getTime() / 1000)} ago
          </div>
          <br />
          <AuthorBlock author={summary.author} />
        </div>
      </CardTopRow>
      <CardBottomRow>
        <div className="left-section">
          <div className="votes">
            <span>{summary.numberOfVotes || 0}</span> Votes
          </div>
          <div className="solutions">
            <span>{summary.numberOfSolutions || 0}</span> Solutions
          </div>
        </div>
        <div className="right-section">
          {summary.tags.map((item) => (
            <Tag key={item.id}>{item.tag}</Tag>
          ))}
        </div>
      </CardBottomRow>
    </Card>
  );
}

export default memo(QuestionCard);
