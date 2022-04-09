import React, { useMemo, memo, useState, useEffect } from 'react';
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
import { useSelector } from 'react-redux';
import {
  selectCourseWebsiteActivities,
  selectWebsiteActivitiesByInterval,
} from 'Store/Selector/admin';
import { useThunkDispatch } from 'common/hooks';
import { getCourseWebsiteActivity } from 'Store/Actions/admin/general/courseLevel.thunk';

// ----------------------------------------------------------------------

function AppWebsiteVisits({ courseId }: any) {
  const interval = 'd';
  const data = useSelector(selectCourseWebsiteActivities);
  const dispatch = useThunkDispatch();

  useEffect(() => {
    dispatch(getCourseWebsiteActivity(courseId));
  }, []);

  const CHART_DATA = useMemo(
    () => [
      {
        name: 'User Visit',
        type: 'line',
        data: data.map((item) => item.visitWithLogin), //change this
      },
    ],
    [data],
  );

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [2] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid'] },
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
        title="Course Visits"
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
