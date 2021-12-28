import React from 'react';
import { Link } from '@mui/material';

export const LinkText = ({ children, style }: any) => (
  <Link
    color="primary"
    component="button"
    variant="body1"
    sx={{ textAlign: 'left', '&:focus': { outline: 0 } }}
    underline="none"
    style={style}
  >
    {children}
  </Link>
);
