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
    name: 'Batch1',
    registrationStartsAt: new Date(),
    registrationEndsAt: new Date(),
    courseStartsAt: new Date(),
    courseEndsAt: new Date(),
    status: 'DRAFT',
    createdAt: new Date(),
  },
  {
    name: 'Batch2',
    registrationStartsAt: new Date(),
    registrationEndsAt: new Date(),
    courseStartsAt: new Date(),
    courseEndsAt: new Date(),
    status: 'ACTIVE',
    createdAt: new Date(),
  },
  {
    name: 'Batch3',
    registrationStartsAt: new Date(),
    registrationEndsAt: new Date(),
    courseStartsAt: new Date(),
    courseEndsAt: new Date(),
    status: 'DRAFT',
    createdAt: new Date(),
  },
];

export default function TableComponent() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Batch Name</TableCell>
            <TableCell align="left">Course Start Period</TableCell>
            <TableCell align="left">Registration Period</TableCell>
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
              <TableCell component="th" scope="row" sx={{ fontSize: '1rem' }}>
                {row.name}
              </TableCell>
              <TableCell align="left">
                {row.courseStartsAt.toLocaleDateString()} -{' '}
                {row.courseEndsAt.toLocaleDateString()}
              </TableCell>
              <TableCell align="left">
                {row.registrationStartsAt.toLocaleDateString()} -{' '}
                {row.registrationEndsAt.toLocaleDateString()}
              </TableCell>
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
