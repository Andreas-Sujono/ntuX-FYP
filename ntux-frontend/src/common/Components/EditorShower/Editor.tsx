import React from 'react';
import Loadable from 'react-loadable';
// import EditablePage from './components/editablePage/index';

const EditablePage = Loadable({
  loader: () => import('./components/editablePage/index'),
  loading: () => null,
});

const defaultBlocks = [
  {
    id: '5f54d75b114c6d176d7e9765',
    html: 'Lesson 1',
    tag: 'h1',
    imageUrl: '',
  },
];
const Editor = ({
  pid,
  blocks,
  err,
  courseId,
  handleUpdate,
  isDisabled,
}: any) => {
  return (
    <EditablePage
      id={pid || '101'}
      fetchedBlocks={blocks || defaultBlocks}
      err={err || ''}
      courseId={courseId}
      handleUpdate={handleUpdate}
      isDisabled={isDisabled}
    />
  );
};

export default React.memo(Editor);
