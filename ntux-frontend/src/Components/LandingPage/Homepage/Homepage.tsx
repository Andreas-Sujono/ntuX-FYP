import React, { memo } from 'react';
import WelcomeSection from './WelcomeSection';
import FeaturesSummary from './FeaturesSummary';
import WhyUs from './WhyUs';
import ExploreCourses from './ExploreCourses';

function Homepage(): React.ReactElement {
  return (
    <div>
      <WelcomeSection />
      <FeaturesSummary />
      <WhyUs />
      <ExploreCourses />
    </div>
  );
}

export default memo(Homepage);
