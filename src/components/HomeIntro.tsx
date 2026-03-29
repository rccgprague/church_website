import React, { FC, useContext } from "react";
import styled from "@emotion/styled";
import Fonts from "@/src/theme/fonts";
import Theme from "@/src/theme";
import { Container, Row, Col, Stack } from "react-bootstrap";
import { StyledOrangeButton } from "./hero/HomeHero";
import { BREAKPOINTS, mediaBreakpointDown } from "../theme/breakpoints";
import { css } from "styled-components";
import PlayIcon from "./common/PlayIcon";
import { useRouter } from "next/router";
import { ModalContext } from "../context/ModalContext";
import { t } from "@lingui/macro";

const StyledIntroSection = styled.section<{ bg: string }>`
  .col-bg {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${({ bg }) => bg ?? "/images/who-we-are-bg.jpeg"});
    background-size: cover;
    padding-top: 100px;
    padding-bottom: 100px;
  }
  .image-text {
    background-color: ${Theme.colors.black};
    background-position: bottom;
    color: ${Theme.colors.white};
    height: 100%;
    padding: 100px 50px;
  }
  h5 {
    ${Fonts.paragraphSmall};
    color: ${Theme.colors.white};
  }
  span {
    color: ${Theme.colors.orange};
  }
  h2 {
    ${Fonts.headingBig};
    align-items: center;
  }
  p {
    color: #cdcdcd;
    ${Fonts.paragraphHero};
    font-size: 18px !important;
  }

  ${mediaBreakpointDown(
    BREAKPOINTS.md,
    css`
      .col-bg {
        height: 500px;
      }
      .image-text {
        padding: 75px 24px;
      }
    `
  )}
`;

const YoutubeIframe = ({ youtubeId }: { youtubeId: string }) => {
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

type HomeIntroProps = {
  title: string;
  message: string;
  bgImage: string;
  youtubeLiveId: string;
};

const HomeIntro: FC<HomeIntroProps> = ({
  title,
  message,
  bgImage,
  youtubeLiveId,
}) => {
  const router = useRouter();
  const { setIsShow, setBody } = useContext(ModalContext);

  const handlePlayIcon = () => {
    setIsShow(true);
    setBody(<YoutubeIframe youtubeId={youtubeLiveId} />);
  };

  const handleAboutClick = () => {
    router.push("/about");
  };
  return (
    <StyledIntroSection bg={bgImage}>
      <Container fluid>
        <Row>
          <Col lg={7} xs={12} className="p-lg-0 col-bg">
            <PlayIcon onPlay={handlePlayIcon} />
          </Col>
          <Col lg={5} xs={12} className="p-0">
            <Stack gap={3} className="image-text">
              <h5>{t`Who we are`}</h5>
              <h2>{title}</h2>
              <p>{message}</p>
              <StyledOrangeButton onClick={handleAboutClick}>
                {t`More About Us`}
              </StyledOrangeButton>
            </Stack>
          </Col>
        </Row>
      </Container>
    </StyledIntroSection>
  );
};

export default HomeIntro;
