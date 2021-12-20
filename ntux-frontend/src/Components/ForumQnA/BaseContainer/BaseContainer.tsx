import React, { memo } from 'react';
// import { CourseAds, OpenForAds } from '../../../common/Components/AdsCard';
import SideNav from './SideNav';
import { Container, LeftSection, CenterSection, RightSection } from './Styles';

function BaseContainer({ children }: any): React.ReactElement {
  return (
    <Container>
      <LeftSection>
        <SideNav />
        {/* <CourseAds widths={['90%']} /> */}
      </LeftSection>
      <CenterSection>{children}</CenterSection>
      <RightSection>{/* <OpenForAds sizeRatio={0.8} /> */}</RightSection>
    </Container>
  );
}

export default memo(BaseContainer);
