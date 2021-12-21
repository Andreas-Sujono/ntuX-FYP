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
    title: 'Test 1',
    description: 'lorem ipsum dolor sit amet',
    status: 'DRAFT',
    createdAt: new Date(),
    releasedAt: new Date(),
    batch: {
      name: 'batch1',
    },
  },
  {
    title: 'Test 1',
    description: 'lorem ipsum dolor sit amet',
    status: 'DRAFT',
    createdAt: new Date(),
    releasedAt: new Date(),
    batch: {
      name: 'batch1',
    },
  },
  {
    title: 'Test 1',
    description: 'lorem ipsum dolor sit amet',
    status: 'DRAFT',
    createdAt: new Date(),
    releasedAt: new Date(),
    batch: {
      name: 'batch1',
    },
  },
];

export default function TableComponent() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Announcement Title</TableCell>
            <TableCell align="left">Batch Name</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Released At</TableCell>
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
              <TableCell align="left">{row.batch.name}</TableCell>
              <TableCell align="left">{row.status}</TableCell>
              <TableCell align="left">
                {row.releasedAt.toLocaleString()}
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
