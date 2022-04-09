import React, { useMemo, memo, useState } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';
import {
  Card,
  CardHeader,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { BaseOptionChart } from './baseOptionChart';

// ----------------------------------------------------------------------

function AppWebsiteVisits({ data, interval }: any) {
  const CHART_DATA = useMemo(
    () => [
      {
        name: 'User Visit Without Login',
        type: 'line',
        data: data.map((item) => item.visitWithoutLogin),
      },
      {
        name: 'User Visit With Login',
        type: 'line',
        data: data.map((item) => item.visitWithLogin),
      },
      {
        name: 'Question Asked',
        type: 'column',
        data: data.map((item) => item.totalQuestion),
      },
      {
        name: 'Solution Answered',
        type: 'column',
        data: data.map((item) => item.totalAnswer),
      },
    ],
    [data],
  );

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [2, 3, 0.5, 0.5] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'solid', 'gradient', 'gradient'] },
    labels: data.map((item) =>
      moment(item.date).add(1, 'day').format('MM/DD/YYYY'),
    ),
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y: any) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        },
      },
    },
  });

  return (
    <Card>
      <CardHeader
        title="Website Visits"
        subheader={`For the past ${
          interval === 'd'
            ? '12 Days'
            : interval === 'm'
            ? '12 Months'
            : '12 Weeks'
        }`}
      />
      {/* <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl> */}
      <Box sx={{ p: 3, pb: 1, pt: 1 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={CHART_DATA}
          options={chartOptions as any}
          height={364}
        />
      </Box>
    </Card>
  );
}

export default memo(AppWebsiteVisits);
