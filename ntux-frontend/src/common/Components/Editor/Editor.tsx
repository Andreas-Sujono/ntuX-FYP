import React from 'react';
import EditablePage from './components/editablePage/index';

const defaultBlocks = [
  {
    id: '5f54d75b114c6d176d7e9765',
    html: 'Lesson 1',
    tag: 'h1',
    imageUrl: '',
  },
];
const Editor = ({ pid, blocks, err, courseId }: any) => {
  return (
    <EditablePage
      id={pid || '101'}
      fetchedBlocks={blocks || defaultBlocks}
      err={err || ''}
      courseId={courseId}
    />
  );
};

export default Editor;
