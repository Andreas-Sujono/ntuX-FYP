import React, { useMemo, memo } from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box } from '@mui/material';
import moment from 'moment';
import { BaseOptionChart } from '../../Dashboard/components/baseOptionChart';

function AppWebsiteVisits({ data, interval }: any) {
  data.sort((a, b) => a.date - b.date);
  const CHART_DATA = useMemo(
    () => [
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
    stroke: { width: [3, 0.5, 0.5] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'gradient'] },
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
