import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import AuthorBlock from '../../../common/Components/AuthorBlock';
import Tag from '../../../common/Components/Tag';
import { makePath, shortenDateFormat } from '../../../common/utils';
import { routes } from '../../Routes';
import { Card, CardTopRow, CardBottomRow } from './Styles';

function QuestionCard({ summary }: { summary: any }): React.ReactElement {
  const history = useHistory();
  const questionPath = makePath(routes.FORUM.QUESTION_DETAIL, {
    questionId: summary.id,
  });

  let tags = summary.arrayAgg?.filter((item) => !!item) || [];
  tags = [...new Set(tags)];

  return (
    <Card onClick={() => history.push(questionPath)}>
      <CardTopRow>
        <div className="left-section">
          <div className="title">{summary.name}</div>
          <div className="subtitle">{summary.description}</div>
        </div>
        <div className="right-section">
          <div className="posted-on">
            Posted{' '}
            {shortenDateFormat(new Date(summary.createdAt).getTime() / 1000)}{' '}
            ago
          </div>
          <br />
          <AuthorBlock
            author={{
              name: summary.fullName,
              profileImage: summary.avatarImageUrl,
            }}
          />
        </div>
      </CardTopRow>
      <CardBottomRow>
        <div className="left-section">
          {/* <div className="votes">
            <span>{summary.numberOfVotes || 0}</span> Votes
          </div> */}
          <div className="solutions">
            <span>{summary.answerCount || 0}</span> Solutions
          </div>
        </div>
        <div className="right-section">
          {tags
            ?.filter((item) => !!item)
            ?.map((item, idx) => (
              <Tag key={idx}>{item}</Tag>
            ))}
        </div>
      </CardBottomRow>
    </Card>
  );
}

export default memo(QuestionCard);
