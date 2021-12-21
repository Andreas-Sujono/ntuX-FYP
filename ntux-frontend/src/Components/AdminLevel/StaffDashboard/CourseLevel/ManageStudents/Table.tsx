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

const rows = [
  {
    name: 'Andreas Sujono',
    email: 'andreassujono@gmail.com',
    role: 'student',
    status: 'ADMITTED',
    createdAt: new Date(),
    batch: {
      name: 'batch 1',
    },
  },
  {
    name: 'Andreas Sujono',
    email: 'andreassujono@gmail.com',
    role: 'student',
    status: 'ADMITTED',
    createdAt: new Date(),
    batch: {
      name: 'batch 1',
    },
  },
  {
    name: 'Andreas Sujono',
    email: 'andreassujono@gmail.com',
    role: 'student',
    status: 'ADMITTED',
    createdAt: new Date(),
    batch: {
      name: 'batch 1',
    },
  },
];

export default function TableComponent() {
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
          {rows.map((row) => (
            <TableRow
              key={row.name}
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
                      courseId: 1,
                      studentId: 1,
                    }),
                  );
                }}
              >
                <LinkText>{row.name}</LinkText>
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.batch.name}</TableCell>
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
