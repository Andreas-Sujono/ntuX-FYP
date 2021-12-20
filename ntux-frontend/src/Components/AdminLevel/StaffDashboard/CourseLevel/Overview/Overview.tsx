import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Typography, Paper, Divider, CardHeader, Avatar } from '@mui/material';
import { TopGrid } from './Styles';
import { red } from '@mui/material/colors';

export default function OverviewContent() {
  return (
    <Container maxWidth="xl" sx={{ margin: 0, mt: 4, mb: 6, ml: 1, mr: 1 }}>
      <Grid container sx={{ pr: 2 }}>
        <TopGrid container spacing={3} maxWidth={'lg'} sx={{}}>
          <Grid item xs={12} md={5}>
            <img
              src="https://i.pcmag.com/imagery/articles/00tLYTqwmgFvacZlYPc5ecO-8.1583853669.fit_lim.jpg"
              style={{ width: '100%', height: '100%' }}
            />
          </Grid>
          <Grid item xs={12} lg={7}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Typography variant="h5">Computer Networking I</Typography>
              <Typography variant="body1" sx={{ fontWeight: 400 }}>
                20 Oct - 27 Oct 2021
              </Typography>
            </Paper>
          </Grid>
        </TopGrid>
        <Grid item xs={12} sx={{ mt: 3 }} maxWidth={'lg'}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Typography variant="h6">About</Typography>
            <Divider />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Modern industrial processes are large, complex and have high
              degree of interaction with many variables. This makes problem
              solving difficult and leads to “disappearing problem” syndrome.
              Problem often disappear without solving will reappear again. This
              course aims to provide an elementary approach of combining cause
              and effect problem solving thinking with formulation of
              theoretically correct hypothesis to provide quick and effective
              problem-solving techniques for the process industries. The initial
              part of the course aims to provide basic problem solving approach
              applicable to any industrial problems and the second part aims to
              provide basics of some common process equipment and utilization of
              chemical engineering fundamentals to develop technically correct
              hypothesis that is the key to the successful problem solving. This
              course includes both sample problems and working sessions to allow
              participants to develop confidence approach.
            </Typography>

            <Typography variant="h6" sx={{ mt: 3 }}>
              Objectives
            </Typography>
            <Divider />
            <Typography variant="body1" sx={{ mt: 2 }}>
              <ul>
                <li>
                  Evaluate product, quotient, power and roots of complex
                  numbers.
                </li>
                <li>
                  Use vector operators (dot product and cross product) to solve
                  simple
                </li>
                mechanics and geometry problems (e.g. find work done, moment,
                equations for planes, distance form a point to a plane etc.).
                <li>
                  Evaluate matrix determinants and use Cramer’s rule to solve
                  simultaneous equations.
                </li>
              </ul>
            </Typography>

            <Typography variant="h6" sx={{ mt: 3 }}>
              Outlines
            </Typography>
            <Divider />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Complex numbers. Vectors and matrices. Limits and continuity of
              functions. Derivatives. Applications of derivatives. Integration.
              Integration methods. Applications of integration
            </Typography>

            <Typography variant="h6" sx={{ mt: 3 }}>
              Lecturers
            </Typography>
            <Divider />
            <Typography variant="body1" sx={{ mt: 1 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    M
                  </Avatar>
                }
                title="Michelle SHAO Xuguang"
                subheader="Senior Lecturer"
                size="large"
              />
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
