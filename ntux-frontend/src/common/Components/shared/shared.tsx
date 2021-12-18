import React from 'react';
import { Link } from '@mui/material';

export const LinkText = ({ children }: any) => (
  <Link
    color="primary"
    component="button"
    variant="body1"
    sx={{ textAlign: 'left', '&:focus': { outline: 0 } }}
    underline="none"
  >
    {children}
  </Link>
);
