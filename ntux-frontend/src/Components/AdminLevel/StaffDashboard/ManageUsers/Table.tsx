import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

function createData(
  name: any,
  calories: any,
  fat: any,
  carbs: any,
  protein: any,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  {
    name: 'Andreas Sujono',
    role: 'student',
    status: 'confirmed',
    createdAt: new Date(),
  },
  {
    name: 'Andreas Sujono',
    role: 'student',
    status: 'confirmed',
    createdAt: new Date(),
  },
  {
    name: 'Andreas Sujono',
    role: 'student',
    status: 'confirmed',
    createdAt: new Date(),
  },
  {
    name: 'Andreas Sujono',
    role: 'student',
    status: 'confirmed',
    createdAt: new Date(),
  },
];

export default function TableComponent() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell align="left">Role</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Join Date</TableCell>
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
              <TableCell align="left">{row.role}</TableCell>
              <TableCell align="left">{row.status}</TableCell>
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
