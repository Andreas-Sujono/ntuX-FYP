import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  MenuItem,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Editor from 'common/Components/Editor';
import { useThunkDispatch } from 'common/hooks';
import { routes } from 'Components/Routes';
import React, { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  createQuestion,
  getOneQuestion,
  updateQuestion,
} from 'Store/Actions/forum';
import { selectAllTags, selectQuestionDetailById } from 'Store/Selector/forum';

const defaultBlocks = [
  {
    id: '5f54d75b114c6d176d7e9765',
    html: 'Edit description  by typing here...',
    tag: 'p',
    imageUrl: '',
  },
  {
    id: '6f54d75b114c6d176d7e9766',
    html: 'typing here .....',
    tag: 'p',
    imageUrl: '',
  },
  {
    id: '4454d75b114c6d176d7e9765',
    html: 'typing here .....',
    tag: 'p',
    imageUrl: '',
  },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(id, personName, theme) {
  return {
    fontWeight:
      personName.indexOf((item) => item.id === id) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export const SelectTags = ({ data, setData }: any) => {
  let alltags = useSelector(selectAllTags);
  const theme = useTheme();
  const [dataMapped, setDataMapped] = useState<any>([]);
  alltags = alltags.slice(0, 100);

  useEffect(() => {
    const idsSet = new Set(data.map((item) => item.id));
    const mapped = alltags.filter((item) => idsSet.has(item.id));
    setDataMapped(mapped);
  }, [data]);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    // const idSet = new Set<any>([]);
    // const values: any = [];

    // value.forEach((item: any) => {
    //   if (!idSet.has(item.id)) {
    //     values.push(item);
    //     idSet.add(item.id);
    //   }
    // });
    setData(value);
    // console.log(values);
  };

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={dataMapped}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Tags" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((item) => (
              <Chip key={item.id} label={item.name} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {alltags.map((item) => (
          <MenuItem
            key={item.id}
            value={item}
            style={getStyles(item.id, data, theme)}
          >
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

function CreateQuestion(): React.ReactElement {
  const [finalData, setFinalData] = useState<any>({
    metadata: defaultBlocks,
  });
  const [tags, setTags] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { questionId } = useParams<any>();
  const history = useHistory();
  const dispatch = useThunkDispatch();

  const isEditMode = !!questionId;

  const questionDetail =
    useSelector(selectQuestionDetailById)[questionId] || {};

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const resData = {
      ...finalData,
      tags: tags.map((item) => ({ id: item.id })),
      description: finalData?.metadata?.reduce(
        (acc, curr) => acc + ' ' + curr.html,
        '',
      ),
    };
    resData.id = questionDetail.id || undefined;

    if (!resData.name || !resData.metadata.length || !resData.tags.length)
      return toast.error('Please fill all the fields');

    setLoading(true);
    let res;
    if (!isEditMode) {
      res = await dispatch(createQuestion(resData));
    } else {
      res = await dispatch(updateQuestion(resData));
    }
    setLoading(false);
    if (res.result) {
      toast.success(
        `Question is ${isEditMode ? 'updated' : 'created'} successfully`,
      );
      return history.push(routes.FORUM.QUESTIONS);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFinalData({ ...finalData, [name]: value });
  };

  const handleUpdate = (data: any) => {
    setFinalData({
      ...finalData,
      metadata: data,
    });
  };

  useEffect(() => {
    if (questionId) {
      dispatch(getOneQuestion(questionId));
    }
  }, [questionId]);

  useEffect(() => {
    console.log('questionDetail: ', questionDetail);
    if (questionDetail && questionDetail.metadata) {
      setFinalData({
        ...questionDetail,
        metadata: questionDetail.metadata || defaultBlocks,
      });
      setTags(questionDetail.tags || []);
    }
  }, [questionDetail?.name]);

  return (
    <Container component="main" maxWidth="md" sx={{ minHeight: '70vh' }}>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid
          container
          spacing={{
            xs: 2,
            md: 2,
          }}
        >
          <Grid item xs={12}>
            <Typography component="h3" variant="h6">
              {isEditMode ? 'Edit' : 'Create'} New Question
            </Typography>
            <Divider sx={{ mb: 2, mt: 0.5 }} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              name="name"
              required
              fullWidth
              id="name"
              label="Question Title"
              autoFocus
              value={finalData?.name}
              onChange={handleChange}
              InputLabelProps={{
                shrink: !!finalData?.name,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <SelectTags data={tags} setData={setTags} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography component="h4" variant="h6">
              Description
            </Typography>
            <Divider sx={{ mb: 2, mt: 0.5 }} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Editor
              pid={'12345'}
              blocks={
                finalData?.metadata?.length ? finalData.metadata : defaultBlocks
              }
              handleUpdate={handleUpdate}
              useTags2
            />
          </Grid>
          <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
            <Divider sx={{ mb: 2, mt: 0.5 }} />
            <Button variant="contained" type="submit" disabled={loading}>
              {isEditMode ? 'Edit' : 'Create'}
            </Button>
            <Button onClick={() => history.push(routes.FORUM.QUESTIONS)}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default memo(CreateQuestion);
