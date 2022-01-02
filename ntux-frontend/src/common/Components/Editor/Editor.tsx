import { useThunkDispatch } from 'common/hooks';
import React from 'react';
import Loadable from 'react-loadable';
import { uploadFile } from 'Store/Actions/admin';
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
  useTags2,
}: any) => {
  const dispatch = useThunkDispatch();

  const handleUploadFile = async (data) => {
    return dispatch(uploadFile(data));
  };
  return (
    <EditablePage
      id={pid || '101'}
      fetchedBlocks={blocks || defaultBlocks}
      err={err || ''}
      courseId={courseId}
      handleUpdate={handleUpdate}
      isDisabled={isDisabled}
      useTags2={useTags2}
      uploadFile={handleUploadFile}
    />
  );
};

export default React.memo(Editor);
