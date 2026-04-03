import { t } from "@lingui/macro";
import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { StyledOrangeButton } from "./hero/HomeHero";
import styled from "@emotion/styled";
import Colors from "../theme/color";
import { css } from "styled-components";
import Theme, { IThemeProps } from "./Theme";
import { ModalContext } from "../context/ModalContext";
import Headings from "./typography/Headings";
import { useGetLiveDetails, useGetRecentVideos } from "../hooks/useLive";
import Loader from "./common/loader/Loader";
import { BREAKPOINTS, mediaBreakpointDown } from "../theme/breakpoints";
import { format } from "date-fns";
import { YTVideo } from "../types/live";

const StyledCountdown = styled.div`
  background-color: ${Colors.dark};
  padding-bottom: 120px;

  .cta-col {
    padding: 60px 40px 80px;
  }

  @media (max-width: 576px) {
    .cta-col {
      padding: 40px 20px 60px;
    }
  }
`;

const StyledLiveCTA = styled(StyledOrangeButton)`
  position: absolute;
  bottom: -30px;
  right: 0;
  left: 0;
  margin: 0 auto;
`;

const StyledCTA = styled(StyledOrangeButton)`
  position: absolute;
  bottom: -30px;
  right: 0;
  left: 0;
  margin: 0 auto;
`;

const LiveDot = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${Colors.orange};
  margin-right: 8px;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.8); }
  }
`;

/* ── Video grid (shown inside modal) ── */

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 24px;

  ${mediaBreakpointDown(
    BREAKPOINTS.sm,
    css`grid-template-columns: 1fr;`
  )}
`;

const VideoCard = styled.button`
  background: none;
  border: none;
  padding: 0;
  text-align: left;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }

  img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    display: block;
  }

  .video-info {
    padding: 10px 4px;

    p {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
      color: ${Colors.white};
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    span {
      font-size: 12px;
      color: ${Colors.secondaryWhite};
      margin-top: 4px;
      display: block;
    }
  }
`;

const WatchAllLink = styled.a`
  display: inline-block;
  margin-top: 28px;
  color: ${Colors.orange};
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 1px solid transparent;

  &:hover {
    color: ${Colors.orange};
    border-bottom-color: ${Colors.orange};
  }
`;

/* ── Sub-components ── */

const LiveYoutubeIframe = ({ youtubeId }: { youtubeId: string }) => (
  <iframe
    width="100%"
    height="500px"
    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
  />
);

const RecentVideosModal = ({ videos }: { videos: YTVideo[] }) => {
  const { setBody } = React.useContext(ModalContext);

  const handleVideoClick = (videoId: string) => {
    setBody(<LiveYoutubeIframe youtubeId={videoId} />);
  };

  const CHANNEL_URL = "https://www.youtube.com/@rccgpraguecovenantparish924/streams";

  return (
    <div>
      <VideoGrid>
        {videos.map((video) => (
          <VideoCard
            key={video.videoId}
            onClick={() => handleVideoClick(video.videoId)}
          >
            <img src={video.thumbnail} alt={video.title} />
            <div className="video-info">
              <p>{video.title}</p>
              <span>
                {video.publishedAt
                  ? format(new Date(video.publishedAt), "dd MMM yyyy")
                  : ""}
              </span>
            </div>
          </VideoCard>
        ))}
      </VideoGrid>
      <div className="text-center">
        <WatchAllLink href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
          {t`Watch all on YouTube →`}
        </WatchAllLink>
      </div>
    </div>
  );
};

/* ── Main component ── */

interface ICountdownProps {
  theme: IThemeProps;
}

const Countdown: React.FunctionComponent<ICountdownProps> = ({ theme }) => {
  const { data: liveData, isLoading: isLoadingLive } = useGetLiveDetails();
  const { data: videos = [] } = useGetRecentVideos();
  const { setIsShow, setBody } = React.useContext(ModalContext);

  const isLive = liveData?.isLive ?? false;

  const handleJoinLive = () => {
    setIsShow(true);
    setBody(<LiveYoutubeIframe youtubeId={liveData?.youtubeId ?? ""} />);
  };

  const handleWatchLatest = () => {
    setIsShow(true);
    setBody(<RecentVideosModal videos={videos} />);
  };

  return (
    <Loader isLoading={isLoadingLive}>
      <StyledCountdown>
        <Container className="px-5">
          <Row className="align-items-center">
            <Col md={{ span: 8, offset: 2 }} className="cta-col text-center" style={{ position: "relative" }}>
              {isLive ? (
                <>
                  <Headings as="h2" className="text-center text-white">
                    <LiveDot />
                    {t`We are live!`}
                  </Headings>
                  <p className="text-center text-white m-0">
                    {t`Click on the button below to join our live event`}
                  </p>
                  <StyledLiveCTA onClick={handleJoinLive}>
                    {t`Join live event`}
                  </StyledLiveCTA>
                </>
              ) : (
                <>
                  <Headings as="h2" className="text-center text-white">
                    {t`Latest Sermons`}
                  </Headings>
                  <p className="text-center text-white m-0">
                    {t`Watch our most recent services and messages`}
                  </p>
                  <StyledCTA onClick={handleWatchLatest}>
                    {t`Watch Latest Sermons`}
                  </StyledCTA>
                </>
              )}
            </Col>
          </Row>
          <Theme
            imageUrl={theme.imageUrl}
            title={theme.title}
            message={theme.message}
            verse={theme.verse}
            logoUrl={theme.logoUrl}
          />
        </Container>
      </StyledCountdown>
    </Loader>
  );
};

export default Countdown;
