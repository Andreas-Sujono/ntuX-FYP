import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { LinkText } from 'common/Components/shared/shared';
import { makePath } from 'common/utils';
import { routes } from 'Components/Routes';
import { useHistory } from 'react-router-dom';
import { useThunkDispatch } from 'common/hooks';
import { changeStudentRegistrationStatus } from 'Store/Actions/admin/general/courseLevel.thunk';

export const StatusSelector = ({ id, value, onChange }: any) => {
  const [status, setStatus] = React.useState(value);

  const handleChange = (_value: any) => {
    setStatus(_value);
    onChange(id, _value);
  };

  React.useEffect(() => {
    setStatus(value);
  }, [value]);

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Status</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={status}
        label="Status"
        onChange={(e: any) => handleChange(e.target.value)}
        size="small"
      >
        <MenuItem value={'PENDING'}>PENDING</MenuItem>
        <MenuItem value={'ADMITTED'}>ADMITTED</MenuItem>
        <MenuItem value={'REJECTED'}>REJECTED</MenuItem>
      </Select>
    </FormControl>
  );
};

export default function TableComponent({ data, courseId, onClickDelete }: any) {
  const history = useHistory();
  const dispatch = useThunkDispatch();

  const handleUpdateStatus = async (id: string, value: string) => {
    dispatch(
      changeStudentRegistrationStatus({
        id,
        status: value,
      }),
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell align="left">Student Email</TableCell>
            <TableCell align="left">Batch Name</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{ fontSize: '1rem' }}
                onClick={() => {
                  console.log('push');
                  history.push(
                    makePath(routes.STAFF_COURSES.STUDENT_DETAIL, {
                      courseId: row?.course?.id || courseId,
                      studentId: row?.user?.id || 1,
                    }),
                  );
                }}
              >
                <LinkText>{row.user?.fullName}</LinkText>
              </TableCell>
              <TableCell align="left">{row.user?.email}</TableCell>
              <TableCell align="left">{row.courseBatch.name}</TableCell>
              <TableCell align="left">
                <StatusSelector
                  id={row.id}
                  value={row.status}
                  onChange={handleUpdateStatus}
                />
              </TableCell>
              <TableCell align="left">
                {/* <Button>Edit</Button> */}
                <Button onClick={onClickDelete}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
