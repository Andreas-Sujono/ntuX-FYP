import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Form from './Form';
import {
  Button,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function ManagePortfolio() {
  return (
    <Container maxWidth="xl" sx={{ margin: 0, mt: 4, mb: 8, ml: 1, pr: 1 }}>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          lg={8}
          sx={(theme) => ({
            [theme.breakpoints.down('md')]: {
              order: 3,
            },
          })}
        >
          <Form />
        </Grid>
        <Grid
          item
          xs={12}
          lg={4}
          sx={(theme) => ({
            [theme.breakpoints.down('md')]: {
              order: 1,
            },
          })}
        >
          <Paper sx={{ p: 2 }}>
            <TextField
              label="Portfolio Url"
              value="www.google.com"
              fullWidth
              disabled
              // endAdornment={
              //   <InputAdornment position="end">
              //     <IconButton edge="end">
              //       <ContentCopyIcon />
              //     </IconButton>
              //   </InputAdornment>
              // }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <ContentCopyIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="filled"
              sx={{ mb: 2 }}
            />
            <Button>Preview Portfolio</Button>
            <Button>Portfolio Settings</Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ManagePortfolio;
