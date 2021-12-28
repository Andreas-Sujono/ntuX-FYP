/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import EditableBlock from '../editableBlock';
import Notice from '../notice';

// A page is represented by an array containing several blocks
// [
//   {
//     _id: "5f54d75b114c6d176d7e9765",
//     html: "Heading",
//     tag: "h1",
//     imageUrl: "",
//   },
//   {
//     _id: "5f54d75b114c6d176d7e9766",
//     html: "I am a <strong>paragraph</strong>",
//     tag: "p",
//     imageUrl: "",
//   },
//   {
//     _id: "5f54d75b114c6d176d7e9767",
//     html: "/im",
//     tag: "img",
//     imageUrl: "images/test.png",
//   }
// ]

const EditablePage = ({ id, fetchedBlocks: blocks, err }) => {
  if (err) {
    return (
      <Notice status="ERROR">
        <h3>Something went wrong 💔</h3>
        <p>Have you tried to restart the app at ?</p>
      </Notice>
    );
  }

  // const [blocks, setBlocks] = useState(fetchedBlocks);

  return (
    <div
      style={{ background: 'white', padding: '1rem 2rem', marginTop: '2rem' }}
    >
      {blocks.map((block) => {
        const position = blocks.map((b) => b._id).indexOf(block._id) + 1;
        return (
          <EditableBlock
            key={block._id}
            position={position}
            id={block._id}
            tag={block.tag}
            html={block.html}
            imageUrl={block.imageUrl}
            pageId={id}
          />
        );
      })}
    </div>
  );
};

export default EditablePage;
