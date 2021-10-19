import React, { memo, useState } from 'react';
import {
  Container,
  TopSection,
  VideoContainer,
  WidgetsContainer,
} from './Styles';
import WeatherWidget from './widgets/WeatherWidget';

const videoSources = [
  {
    video: 'https://www.youtube-nocookie.com/embed/vJH3dFttpSg?&autoplay=1',
    thumbnail:
      'https://res.cloudinary.com/dx6juznlw/image/upload/v1625036194/devThinker/study-lofi_q8lgt4.png',
  },
  {
    video: 'https://www.youtube.com/embed/5qap5aO4i9A?&autoplay=1',
    thumbnail:
      'https://res.cloudinary.com/dx6juznlw/image/upload/v1625036173/devThinker/lofi-girl_yh558p.png',
  },
  {
    video: 'https://www.youtube.com/embed/bmVKaAV_7-A?&autoplay=1',
    thumbnail:
      'https://res.cloudinary.com/dx6juznlw/image/upload/v1625036166/devThinker/joma-lofi_wx31jd.png',
  },
];

const MainPage: React.FC = () => {
  const [videoSource, setVideoSource] = useState(videoSources[0].video);

  return (
    <Container>
      <TopSection>
        <div className="left-section">
          <iframe
            width="100%"
            src={videoSource}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="right-section">
          {videoSources.map((item) => (
            <VideoContainer
              key={item.video}
              onClick={() => setVideoSource(item.video)}
            >
              <img src={item.thumbnail} />
            </VideoContainer>
          ))}
        </div>
      </TopSection>
      <WidgetsContainer>
        <WeatherWidget />
      </WidgetsContainer>
    </Container>
  );
};

export default memo(MainPage);
