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
    name: 'Voucher 50$',
    description: 'lorem ipsum dolor sit amet',
    reedemCount: 5,
    status: 'Active',
    createdAt: new Date(),
  },
  {
    name: 'Voucher 50$',
    description: 'lorem ipsum dolor sit amet',
    reedemCount: 5,
    status: 'Active',
    createdAt: new Date(),
  },
  {
    name: 'Voucher 50$',
    description: 'lorem ipsum dolor sit amet',
    reedemCount: 5,
    status: 'Active',
    createdAt: new Date(),
  },
  {
    name: 'Voucher 50$',
    description: 'lorem ipsum dolor sit amet',
    reedemCount: 5,
    status: 'Active',
    createdAt: new Date(),
  },
];

export default function RewardTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Reward Name</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Redeemed Count</TableCell>
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
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="left">{row.status}</TableCell>
              <TableCell align="left">{row.reedemCount}</TableCell>
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
