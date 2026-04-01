import { t } from "@lingui/macro";
import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { StyledOrangeButton } from "./hero/HomeHero";
import styled from "@emotion/styled";
import Colors from "../theme/color";
import { CircularProgressbar } from "react-circular-progressbar";
import Theme, { IThemeProps } from "./Theme";
import { useCountdownTimer } from "../hooks/useCountdown";
import { ModalContext } from "../context/ModalContext";
import Headings from "./typography/Headings";
import { useGetLiveDetails } from "../hooks/useLive";
import Loader from "./common/loader/Loader";

const StyledCountdown = styled.div`
  background-color: ${Colors.grey};
  padding-bottom: 120px;
  .countdown-col {
    position: relative;
    padding: 40px 40px 80px;
    background-color: ${Colors.dark};
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    .countdown-row {
      justify-content: center;
      row-gap: 20px;
    }
  }
  @media (max-width: 576px) {
    .countdown-col {
      padding: 28px 20px 52px;
    }
  }
`;

const StyledCountdounCTA = styled(StyledOrangeButton)`
  position: absolute;
  bottom: -30px;
  right: 0;
  left: 0;
  margin: 0 auto;
`;

interface ICountdownProps {
  theme: IThemeProps;
}

const LiveYoutubeIframe = ({ youtubeId }: { youtubeId: string }) => {
  return (
    <iframe
      width="100%"
      height="500px"
      src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
};

const Countdown: React.FunctionComponent<ICountdownProps> = ({ theme }) => {
  const { data: liveData, isLoading: isLoadingLiveDetails } =
    useGetLiveDetails();
  const { youtubeId, startDateTime } = liveData ?? {};
  const {
    days,
    isClosed,
    minutes,
    hours,
    seconds,
    isLoading: isLoadingCountDown,
  } = useCountdownTimer(startDateTime ?? new Date());
  const { setIsShow, setBody } = React.useContext(ModalContext);

  const isLoading = isLoadingLiveDetails || isLoadingCountDown;

  const countdownTimer = React.useMemo(() => {
    return [
      {
        id: 1,
        text: `${days} days`,
        color: Colors.skyBlue,
        value: (days / 7) * 100,
      },
      {
        id: 2,
        text: `${hours} Hrs`,
        color: Colors.lightOrange,
        value: (hours / 24) * 100,
      },
      {
        id: 3,
        text: `${minutes} Mins`,
        color: Colors.orange,
        value: (minutes / 60) * 100,
      },
      {
        id: 4,
        text: `${seconds} Secs`,
        color: Colors.green,
        value: (seconds / 60) * 100,
      },
    ];
  }, [days, hours, minutes, seconds]);

  const handleLiveModal = () => {
    setIsShow(true);
    setBody(<LiveYoutubeIframe youtubeId={youtubeId ?? ""} />);
  };
  return (
    <Loader isLoading={isLoading}>
      <StyledCountdown>
        <Container className="px-5">
          <Row className="align-items-center">
            <Col md={{ span: 8, offset: 2 }} className="countdown-col">
              {isClosed ? (
                <>
                  <Headings
                    as="h2"
                    className="text-center text-white"
                  >{t`We are live!`}</Headings>
                  <p className="text-center text-white m-0">{t`Click on the button below to join our live event`}</p>
                </>
              ) : (
                <>
                  <p className="text-center text-white">{t`We will be live in:`}</p>
                  <Row className="countdown-row">
                    {countdownTimer.map((time) => {
                      return (
                        <Col
                          key={`countdown-${time.id}`}
                          xs={6}
                          sm={4}
                          md={3}
                          lg={2}
                        >
                          <CircularProgressbar
                            styles={{
                              path: {
                                strokeWidth: "2px",
                                stroke: time.color,
                              },
                              trail: {
                                strokeWidth: "2px",
                                stroke: Colors.grey,
                              },
                              text: { fill: Colors.white, fontSize: 12 },
                            }}
                            value={time.value}
                            text={time.text}
                            counterClockwise
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </>
              )}
              <StyledCountdounCTA onClick={handleLiveModal}>
                {isClosed ? t`Join live event` : t`Watch Rebroadcast`}
              </StyledCountdounCTA>
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
