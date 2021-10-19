import { PrimaryButton } from 'common/Components/Button';
import { mockQuestions } from 'Models/mockData';
import React, { memo } from 'react';
import { Container, TitleRow, BoxContainer, Box } from './Styles';

const ManageForum: React.FC = () => {
  return (
    <Container>
      <TitleRow>
        <div>
          <div className="title">Manage Questions</div>
          <div className="subtitle">
            Ask Questions if you have any doubts, give solution or upvote
            solution to help fellow peers
          </div>
        </div>
        <PrimaryButton style={{ height: '42px' }}>
          Ask New Question
        </PrimaryButton>
      </TitleRow>
      <BoxContainer>
        <Box>
          <div className="name">You Have Asked</div>
          <div className="number">
            <span>6</span> Blogs
          </div>
        </Box>
        <Box>
          <div className="name">You have given</div>
          <div className="number">
            <span>1021</span> Solutions
          </div>
        </Box>
        <Box>
          <div className="name">Upvoted Solutions</div>
          <div className="number">
            <span>4/10</span> Solutions
          </div>
        </Box>
      </BoxContainer>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#id</th>
            <th scope="col">Question</th>
            <th scope="col">No. Solutions</th>
            <th scope="col">Solved</th>
            <th scope="col">Published Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          {mockQuestions.map((item) => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.question}</td>
              <td>{item.numberOfSolutions || 0}</td>
              <td>{item?.isSolved ? 'Yes' : 'No'}</td>
              <td>{item.postedDate.toDateString()}</td>
              <td>Edit | Delete | Solved</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default memo(ManageForum);
