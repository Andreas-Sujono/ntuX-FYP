import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { green } from '@mui/material/colors';
import TabsContainer from './Tabs/TabsContainer';
import styled from 'styled-components';
import { media } from 'common/styling';

export const StyledContainer = styled(Grid)<any>`
  position: relative;
  top: -6rem;
  ${media.lessThan('md')`
    top: -11.5rem;

    > * {
      padding: 16px;
    }
  `};
`;

function SettingsContent() {
  return (
    <Container
      sx={{ margin: 0 }}
      style={{
        padding: 0,
        width: '100%',
        maxWidth: '100%',
        minHeight: '90vh',
      }}
    >
      <Paper style={{ width: '100%', height: '200px', maxWidth: '100%' }}>
        <img
          src="https://images.unsplash.com/photo-1506782081254-09bcfd996fd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=500&q=60"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Paper>

      <StyledContainer
        container
        spacing={3}
        maxWidth={'lg'}
        sx={{ margin: 'auto' }}
      >
        <Grid item xs={12} md={3}>
          <Paper style={{ width: '100%', height: '200px', maxWidth: '100%' }}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Avatar
                  alt="Andreas Sujono"
                  src="/static/images/avatar/1.jpg"
                  sx={{
                    width: 80,
                    height: 80,
                    fontSize: '2.5rem',
                    bgcolor: green[500],
                  }}
                />
                <Typography variant="h6" component="div" sx={{ mt: 1 }}>
                  Andreas Sujono
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  andreassujono@gmail.com
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">More Details</Button>
              </CardActions>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <TabsContainer />
        </Grid>
      </StyledContainer>
    </Container>
  );
}

export default SettingsContent;
