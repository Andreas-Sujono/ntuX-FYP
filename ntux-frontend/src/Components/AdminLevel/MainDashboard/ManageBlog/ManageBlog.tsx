import { PrimaryButton } from 'common/Components/Button';
import { mockBlogs } from 'Models/mockData';
import React, { memo } from 'react';
import { Container, TitleRow, BoxContainer, Box } from './Styles';

const ManageBlog: React.FC = () => {
  return (
    <Container>
      <TitleRow>
        <div>
          <div className="title">Manage Blog</div>
          <div className="subtitle">
            See your dashboard statistics and write your own blog
          </div>
        </div>
        <PrimaryButton style={{ height: '42px' }}>Write New Blog</PrimaryButton>
      </TitleRow>
      <BoxContainer>
        <Box>
          <div className="name">You Have written</div>
          <div className="number">
            <span>6</span> Blogs
          </div>
        </Box>
        <Box>
          <div className="name">Number of Views</div>
          <div className="number">
            <span>1021</span> Views
          </div>
        </Box>
        <Box>
          <div className="name">You Have Read</div>
          <div className="number">
            <span>6</span> Blogs
          </div>
        </Box>
      </BoxContainer>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#id</th>
            <th scope="col">Title</th>
            <th scope="col">Views</th>
            <th scope="col">Status</th>
            <th scope="col">Published Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          {mockBlogs.map((item) => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.title}</td>
              <td>{item.views || 0}</td>
              <td>Published</td>
              <td>{item.postedDate.toDateString()}</td>
              <td>Publish | Edit | Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default memo(ManageBlog);
