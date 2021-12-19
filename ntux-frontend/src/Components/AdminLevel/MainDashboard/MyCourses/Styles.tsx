import React from 'react';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#6BAD00',
  },
}));

export function LinearProgressWithLabel(props: any) {
  const textValue =
    props.type === 'string' ? props.label : `${Math.round(props.value)}%`;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ...props.sx }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <BorderLinearProgress variant="determinate" {...props} sx={{}} />
      </Box>
      <Box sx={{ minWidth: props.minWidth || 35 }}>
        <Typography variant="body2" color="text.secondary">
          {textValue}
        </Typography>
      </Box>
    </Box>
  );
}
