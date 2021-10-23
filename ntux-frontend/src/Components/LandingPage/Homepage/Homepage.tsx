import React, { memo } from 'react';
import WelcomeSection from './WelcomeSection';
import FeaturesSummary from './FeaturesSummary';

function Homepage(): React.ReactElement {
  return (
    <div className="dt-bprimary">
      <WelcomeSection />
      <FeaturesSummary />
    </div>
  );
}

export default memo(Homepage);
