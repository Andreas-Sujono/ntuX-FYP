import React from 'react';
import EditablePage from './components/editablePage/index';

const defaultBlocks = [
  {
    _id: '5f54d75b114c6d176d7e9765',
    html: 'Heading',
    tag: 'h1',
    imageUrl: '',
  },
];
const EditorShower = ({ pid, blocks, err }: any) => {
  return (
    <EditablePage
      id={pid || '12345678'}
      fetchedBlocks={blocks || defaultBlocks}
      err={err || ''}
    />
  );
};

export default EditorShower;
