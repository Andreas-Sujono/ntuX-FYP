import React, { memo } from 'react';
import AuthorBlock from '../../../../common/Components/AuthorBlock';
import SocialMediaShare from '../../../../common/Components/SocialMediaShare';
import { Author } from '../../../../Models/Blog';
import {
  Container,
  Title,
  AuthorShareRow,
  ImageContent,
  TextContent,
} from './Styles';

interface Props {
  content: string;
  author: Author;
}

function BlogDetail({ content, author }: Props): React.ReactElement {
  console.log(content);
  return (
    <Container>
      <Title className="cw-2">
        Lorem Ipsum Dolor Sit Amet, Lorem ipsum dolor sit amet
      </Title>
      <AuthorShareRow>
        <div className="left-section">
          Posted 1 month ago
          <AuthorBlock author={author} />
        </div>
        <div className="right-section">
          <SocialMediaShare />
        </div>
      </AuthorShareRow>
      <ImageContent className="cw-3">
        <img src="https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg" />
      </ImageContent>
      <TextContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Velit euismod in
        pellentesque massa. Suscipit adipiscing bibendum est ultricies integer
        quis auctor elit sed. Et malesuada fames ac turpis. Odio pellentesque
        diam volutpat commodo sed egestas. Amet consectetur adipiscing elit
        pellentesque.
      </TextContent>
      <TextContent>
        Adipiscing bibendum est ultricies integer. Turpis tincidunt id aliquet
        risus feugiat in ante metus dictum. Eget dolor morbi non arcu risus quis
        varius quam quisque.
      </TextContent>
      <TextContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Velit euismod in
        pellentesque massa. Suscipit adipiscing bibendum est ultricies integer
        quis auctor elit sed. Et malesuada fames ac turpis. Odio pellentesque
        diam volutpat commodo sed egestas. Amet consectetur adipiscing elit
        pellentesque.Suscipit adipiscing bibendum est ultricies integer quis
        auctor elit sed. Et malesuada fames ac turpis. Odio pellentesque diam
        volutpat commodo sed egestas. Amet consectetur adipiscing elit
        pellentesque.
      </TextContent>
      <TextContent>
        Adipiscing bibendum est ultricies integer. Turpis tincidunt id aliquet
        risus feugiat in ante metus dictum. Eget dolor morbi non arcu risus quis
        varius quam quisque.
      </TextContent>
      <hr className="cw-1" />
    </Container>
  );
}

export default memo(BlogDetail);
