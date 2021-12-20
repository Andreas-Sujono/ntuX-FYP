import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

const rows = [
  {
    title: 'How to install NodeJs on Mac?',
    description: '',
    solutionCount: 5,
    user: {
      name: 'John Doe',
    },
    createdAt: new Date(),
  },
  {
    title: 'How to install NodeJs on Mac?',
    description: '',
    solutionCount: 5,
    user: {
      name: 'John Doe',
    },
    createdAt: new Date(),
  },
  {
    title: 'How to install NodeJs on Mac?',
    description: '',
    solutionCount: 5,
    user: {
      name: 'John Doe',
    },
    createdAt: new Date(),
  },
  {
    title: 'How to install NodeJs on Mac?',
    description: '',
    solutionCount: 5,
    user: {
      name: 'John Doe',
    },
    createdAt: new Date(),
  },
];

export default function QuestionTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Question Title</TableCell>
            <TableCell align="left">Posted By</TableCell>
            <TableCell align="left">Number of Solution</TableCell>
            <TableCell align="left">Posted At</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ fontSize: '1rem' }}>
                {row.title}
              </TableCell>
              <TableCell align="left">{row.user.name}</TableCell>
              <TableCell align="left">{row.solutionCount}</TableCell>
              <TableCell align="left">
                {row.createdAt.toLocaleDateString()}
              </TableCell>
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
