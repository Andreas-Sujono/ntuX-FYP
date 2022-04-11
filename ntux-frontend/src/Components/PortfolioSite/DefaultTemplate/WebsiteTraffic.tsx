import React from 'react';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box } from '@mui/material';
import moment from 'moment';
import { BaseOptionChart } from 'Components/AdminLevel/StaffDashboard/Dashboard/components/baseOptionChart';

export default function AppWebsiteVisits({ data, interval }: any) {
  const INTERVAL = interval || 'd';

  const parsedData = React.useMemo(() => {
    data.sort((a, b) => a.date - b.date);

    if (INTERVAL === 'm') {
      const res: any = [];
      for (let i = 0; i < data.length; i += 30) {
        const first = data[i];
        const temp = {
          date: first.date,
          totalAnswer: 0,
          totalQuestion: 0,
          totalTutorRequest: 0,
          totalTutorRequestAccepted: 0,
          visitWithLogin: 0,
          visitWithoutLogin: 0,
        };
        let counter = 0;
        while (i + counter < data.length && counter < 30) {
          const d = data[i + counter];
          temp.totalAnswer += d.totalAnswer;
          temp.totalQuestion += d.totalQuestion;
          temp.totalTutorRequest += d.totalTutorRequest;
          temp.totalTutorRequestAccepted += d.totalTutorRequestAccepted;
          temp.visitWithLogin += d.visitWithLogin;
          temp.visitWithoutLogin += d.visitWithoutLogin;
          counter++;
        }
        res.push(temp);
      }
      return res;
    }

    if (INTERVAL === 'w') {
      const res: any = [];
      for (let i = 0; i < data.length; i += 7) {
        const first = data[i];
        const temp = {
          date: first.date,
          totalAnswer: 0,
          totalQuestion: 0,
          totalTutorRequest: 0,
          totalTutorRequestAccepted: 0,
          visitWithLogin: 0,
          visitWithoutLogin: 0,
        };
        let counter = 0;
        while (i + counter < data.length && counter < 7) {
          const d = data[i + counter] || {};
          temp.totalAnswer += Number(d.totalAnswer || 0);
          temp.totalQuestion += Number(d.totalQuestion || 0);
          temp.totalTutorRequest += Number(d.totalTutorRequest || 0);
          temp.totalTutorRequestAccepted += Number(
            d.totalTutorRequestAccepted || 0,
          );
          temp.visitWithLogin += Number(d.visitWithLogin || 0);
          temp.visitWithoutLogin += Number(d.visitWithoutLogin || 0);
          counter++;
        }
        res.push(temp);
        return res;
      }
      return data.slice(0, 12);
    }

    return data.slice(0, 12);
  }, [data, INTERVAL]);

  const CHART_DATA = React.useMemo(
    () => [
      {
        name: 'Student Visit',
        type: 'line',
        data: parsedData.map((item) => item.visitWithLogin),
      },
      {
        name: 'Question Asked',
        type: 'column',
        data: parsedData.map((item) => item.totalQuestion),
      },
      {
        name: 'Solution Answered',
        type: 'column',
        data: parsedData.map((item) => item.totalAnswer),
      },
    ],
    [parsedData],
  );

  if (parsedData.length === 1) {
    const first = parsedData[0];
    parsedData.unshift({
      date: moment(first.date).subtract('week', 1).format('YYYY-MM-DD'),
      totalAnswer: 0,
      totalQuestion: 0,
      totalTutorRequest: 0,
      totalTutorRequestAccepted: 0,
      visitWithLogin: 0,
      visitWithoutLogin: 0,
    });
  }
  console.log('parsedData: ', parsedData);

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [2, 0, 0] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'gradient'] },
    labels: parsedData.map((item) =>
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
        title="My Activities"
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
