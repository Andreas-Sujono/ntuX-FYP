import React from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box } from '@mui/material';
import moment from 'moment';
import { BaseOptionChart } from '../../Dashboard/components/baseOptionChart';

export default function AppWebsiteVisits({ data }: any) {
  const INTERVAL = 'd';

  const parsedData = React.useMemo(() => {
    data.sort((a, b) => a.date - b.date);

    // if (INTERVAL === 'm') {
    //   return data.slice(0, 12);
    // }
    // if (INTERVAL === 'w') {
    //   return data.slice(0, 12);
    // }

    return data.slice(0, 12);
  }, [data, INTERVAL]);

  const CHART_DATA = React.useMemo(
    () => [
      {
        name: 'Student Visit',
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
    [parsedData],
  );

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [2, 0, 0] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'gradient'] },
    labels: parsedData.map((item) => moment(item.date).format('MM/DD/YYYY')),
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
        title="Student Activities"
        subheader={`For the past ${
          INTERVAL === 'd'
            ? '12 Days'
            : INTERVAL === 'm'
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
