import React, { memo } from 'react';
import { Container } from './Styles';

const WeatherWidget: React.FC = () => {
  return (
    <Container>
      <h2>Singapore&apos;s Weather</h2>
      {/* <img src="https://www.7timer.info/bin/astro.php?lon=103.691551&lat=1.356220&ac=0&lang=en&unit=metric&output=internal&tzshift=0" /> */}
    </Container>
  );
};

export default memo(WeatherWidget);
