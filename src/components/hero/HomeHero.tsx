import React from "react";
import styled from "@emotion/styled";
import { Button, Carousel, Col, Row, Stack } from "react-bootstrap";
import { BREAKPOINTS, mediaBreakpointDown } from "@/src/theme/breakpoints";
import Fonts from "@/src/theme/fonts";
import Theme from "@/src/theme";
import { css } from "styled-components";
import { useRouter } from "next/router";
import { t } from "@lingui/macro";
import { PUBLIC_ROUTES } from "@/src/constants/routes";
import { BannerSlide } from "@/src/types/home";

interface HomeHeroProps {
  title: string;
  subTitle: string;
  slides: BannerSlide[];
}

/**
 * Convert a Sanity hotspot (0–1 normalised) to a CSS background-position value.
 * Falls back to "center center" when no hotspot is set.
 */
function hotspotPosition(hotspot?: { x: number; y: number }): string {
  if (!hotspot) return "center center";
  return `${(hotspot.x * 100).toFixed(1)}% ${(hotspot.y * 100).toFixed(1)}%`;
}

const GRADIENT =
  "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.75) 100%)";

const StyledCarousel = styled(Carousel)`
  .carousel-indicators {
    margin-bottom: 1.5rem;
    gap: 6px;

    button {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 2px solid ${Theme.colors.orange};
      background-color: transparent;
      opacity: 0.7;
      transition: background-color 0.3s ease, opacity 0.3s ease;

      &.active {
        background-color: ${Theme.colors.orange};
        opacity: 1;
      }
    }
  }

  .carousel-control-prev,
  .carousel-control-next {
    width: 48px;
    height: 48px;
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    bottom: auto;
    opacity: 0.8;

    &:hover {
      background-color: ${Theme.colors.orange};
      opacity: 1;
    }
  }

  .carousel-control-prev {
    left: 24px;
  }

  .carousel-control-next {
    right: 24px;
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    width: 18px;
    height: 18px;
  }

  ${mediaBreakpointDown(
    BREAKPOINTS.sm,
    css`
      .carousel-control-prev,
      .carousel-control-next {
        width: 36px;
        height: 36px;
      }

      .carousel-control-prev {
        left: 12px;
      }

      .carousel-control-next {
        right: 12px;
      }
    `
  )}
`;

const SlideBackground = styled.div<{
  bg: string;
  bgPosition: string;
  mobileBg: string;
  mobileBgPos: string;
}>`
  background-image: ${GRADIENT}, url(${(p) => p.bg});
  background-size: cover;
  background-position: ${(p) => p.bgPosition};
  background-repeat: no-repeat;
  min-height: 85vh;
  display: flex;
  align-items: flex-end;
  padding: 0 80px 100px;

  h1 {
    ${Fonts.headingOne};
    color: ${Theme.colors.white};
    width: 100%;
    max-width: 560px;
  }

  p {
    ${Fonts.paragraphHero};
    color: ${Theme.colors.light};
    width: 100%;
    max-width: 500px;
  }

  ${mediaBreakpointDown(
    BREAKPOINTS.xl,
    css`
      min-height: 75vh;
      padding: 0 60px 80px;
    `
  )}

  ${mediaBreakpointDown(
    BREAKPOINTS.lg,
    css`
      min-height: 65vh;
      padding: 0 40px 70px;

      h1 {
        font-size: 36px;
        line-height: 120%;
      }

      p {
        font-size: 18px;
      }
    `
  )}

  ${mediaBreakpointDown(
    BREAKPOINTS.md,
    css`
      min-height: 55vh;
      padding: 0 24px 60px;

      h1 {
        font-size: 30px;
      }

      p {
        font-size: 16px;
      }
    `
  )}

  ${mediaBreakpointDown(
    BREAKPOINTS.sm,
    css`
      min-height: 30vh;
      padding: 0 16px 44px;

      h1 {
        font-size: 24px;
        max-width: 100%;
      }

      p {
        font-size: 15px;
        max-width: 100%;
      }
    `
  )}

  /* Portrait phones/tablets: switch to the mobile-optimised image */
  @media (max-width: ${BREAKPOINTS.md}px) and (orientation: portrait) {
    background-image: ${GRADIENT}, url(${(p) => p.mobileBg});
    background-position: ${(p) => p.mobileBgPos};
  }
`;

export const StyledOrangeButton = styled(Button)`
  background-color: ${Theme.colors.orange};
  ${Fonts.button};
  border-radius: 5px;
  width: 236px;
  max-width: 100%;
  height: 70px;
  border: ${Theme.colors.orange};
  :hover {
    background-color: transparent;
    border: 1px solid ${Theme.colors.orange};
  }

  ${mediaBreakpointDown(
    BREAKPOINTS.sm,
    css`
      width: auto;
      height: 34px;
      padding: 0 14px;
      font-size: 12px;
    `
  )}
`;

/** Title, subtitle and buttons inside the banner — hidden on mobile/tablet (≤lg) */
const BannerTextDesktop = styled.div`
  ${mediaBreakpointDown(BREAKPOINTS.lg, css`display: none;`)}
`;

/** Title + subtitle below the banner — only visible on mobile/tablet (≤lg) */
const BannerCaptionMobile = styled.div`
  display: none;
  background-color: ${Theme.colors.grey};
  padding: 28px 20px 24px;
  text-align: center;

  h2 {
    ${Fonts.headingOne};
    color: ${Theme.colors.white};
    font-size: 26px;
    line-height: 1.25;
    max-width: 520px;
    margin: 0 auto 12px;
  }

  p {
    ${Fonts.paragraphHero};
    color: ${Theme.colors.light};
    font-size: 15px;
    max-width: 520px;
    margin: 0 auto;
  }

  ${mediaBreakpointDown(BREAKPOINTS.lg, css`display: block;`)}

  ${mediaBreakpointDown(
    BREAKPOINTS.sm,
    css`
      padding: 20px 16px 20px;
      h2 { font-size: 22px; }
      p { font-size: 14px; }
    `
  )}
`;

const StyledTransparentButton = styled(Button)`
  background-color: transparent !important;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 5px;
  ${Fonts.button};
  width: 200px;
  max-width: 100%;
  height: 70px;
  :hover {
    border: 1px solid ${Theme.colors.orange} !important;
  }

  ${mediaBreakpointDown(
    BREAKPOINTS.sm,
    css`
      width: auto;
      height: 34px;
      padding: 0 14px;
      font-size: 12px;
    `
  )}
`;

const HomeHero: React.FC<HomeHeroProps> = ({ title, subTitle, slides }) => {
  const router = useRouter();

  const handleRoutePush = (path: keyof typeof PUBLIC_ROUTES) => {
    router.push(PUBLIC_ROUTES[path]);
  };

  return (
    <>
      <StyledCarousel
        interval={6000}
        ride="carousel"
        fade
        indicators={slides.length > 1}
        controls={slides.length > 1}
      >
        {slides.map((slide, index) => (
          <Carousel.Item key={index}>
            <SlideBackground
              bg={slide.imageUrl}
              bgPosition={hotspotPosition(slide.hotspot)}
              mobileBg={slide.mobileImageUrl ?? slide.imageUrl}
              mobileBgPos={hotspotPosition(slide.mobileHotspot ?? slide.hotspot)}
            >
              <Row className="w-100">
                <Col xs={12} md={9} lg={7}>
                  <BannerTextDesktop>
                    <Stack gap={4}>
                      <h1>{title}</h1>
                      <p className="text-start">{subTitle}</p>
                      <Stack direction="horizontal" gap={3} className="flex-wrap">
                        <StyledOrangeButton
                          onClick={() => handleRoutePush("events")}
                        >{t`our events`}</StyledOrangeButton>
                        <StyledTransparentButton
                          onClick={() => handleRoutePush("digitalLibrary")}
                        >
                          {t`Digital Library`}
                        </StyledTransparentButton>
                      </Stack>
                    </Stack>
                  </BannerTextDesktop>
                </Col>
              </Row>
            </SlideBackground>
          </Carousel.Item>
        ))}
      </StyledCarousel>
      <BannerCaptionMobile>
        <h2>{title}</h2>
        <p>{subTitle}</p>
        <Stack direction="horizontal" gap={3} className="flex-wrap justify-content-center mt-3">
          <StyledOrangeButton
            onClick={() => handleRoutePush("events")}
          >{t`our events`}</StyledOrangeButton>
          <StyledTransparentButton
            onClick={() => handleRoutePush("digitalLibrary")}
          >
            {t`Digital Library`}
          </StyledTransparentButton>
        </Stack>
      </BannerCaptionMobile>
    </>
  );
};

export default HomeHero;
