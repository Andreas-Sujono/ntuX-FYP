import { merge } from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTheme, styled } from '@mui/material/styles';
import {
  Card,
  CardHeader,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { BaseOptionChartStyle, BaseOptionChart } from './baseOptionChart';
import { useThunkDispatch } from 'common/hooks';
import { getCourseSummary } from 'Store/Actions/admin/general/courseLevel.thunk';
import { useSelector } from 'react-redux';
import { selectAllCourseBatchesByCourseId } from 'Store/Selector/admin';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(1),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

function UsersChart({ data, courseId }: any) {
  const [batchName, setBatchName] = useState('all');
  const theme = useTheme();
  const courseBatch =
    useSelector(selectAllCourseBatchesByCourseId)[courseId] || [];

  const dispatch = useThunkDispatch();

  const handleChange = (event) => {
    setBatchName(event.target.value);
    dispatch(
      getCourseSummary(
        courseId,
        event.target.value === 'all' ? null : event.target.value,
      ),
    );
  };

  useEffect(() => {
    dispatch(getCourseSummary(courseId));
  }, []);

  const CHART_DATA = [
    parseInt(data.pendingUser || '0'),
    parseInt(data.admittedUser || '0'),
    (data.totalCurrentUser || 0) -
      (data.pendingUser || 0) -
      (data.admittedUser || 0),
  ];

  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.error.main,
    ],
    labels: ['Pending Student', 'Admitted Student', 'Others'],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName: any) => seriesName,
        title: {
          formatter: (seriesName: any) => `#${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              formatter: (val: any) => val,
            },
            total: {
              show: true,
            },
          },
        },
      },
    },
  });
  return (
    <Card sx={{ height: '100%' }}>
      <BaseOptionChartStyle />
      <CardHeader
        title={`Student Registration: ${data.totalCurrentUser || 0}`}
        action={
          <FormControl>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={batchName}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={'all'}>All Batches</MenuItem>
              {courseBatch.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        }
      />

      <ChartWrapperStyle dir="ltr">
        <ReactApexChart
          type="pie"
          series={CHART_DATA}
          options={chartOptions as any}
          height={280}
        />
      </ChartWrapperStyle>
    </Card>
  );
}

export default memo(UsersChart);
