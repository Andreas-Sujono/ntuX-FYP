import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { LinkText } from 'common/Components/shared/shared';
import { makePath } from 'common/utils';
import { routes } from 'Components/Routes';
import { useHistory } from 'react-router-dom';

export default function TableComponent({ data }: any) {
  const history = useHistory();
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
                      courseId: data.course.id,
                      studentId: data.user?.id || 1,
                    }),
                  );
                }}
              >
                <LinkText>{row.user?.fullName}</LinkText>
              </TableCell>
              <TableCell align="left">{row.user?.email}</TableCell>
              <TableCell align="left">{row.courseBatch.name}</TableCell>
              <TableCell align="left">{row.status}</TableCell>
              <TableCell align="left">
                <Button>Edit</Button>
                <Button>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
