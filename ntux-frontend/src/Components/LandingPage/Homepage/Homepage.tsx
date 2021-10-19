import React, { memo } from 'react';
import WelcomeSection from './WelcomeSection';
import FeaturesSummary from './FeaturesSummary';
import FeaturesSection from './FeaturesSection';
import Subscriptions from './Subscriptions';
import GetStarted from './GetStarted';

function Homepage(): React.ReactElement {
  return (
    <div className="dt-bprimary">
      <WelcomeSection />
      <FeaturesSummary />
      <FeaturesSection />
      <Subscriptions />
      <GetStarted />
    </div>
  );
}

export default memo(Homepage);
