import React from "react";
import styled from "@emotion/styled";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { BREAKPOINTS, mediaBreakpointDown } from "@/src/theme/breakpoints";
import Fonts from "@/src/theme/fonts";
import Theme from "@/src/theme";
import { css } from "styled-components";
import { useRouter } from "next/router";
import { t } from "@lingui/macro";
import { PUBLIC_ROUTES } from "@/src/constants/routes";

interface HomeHeroProps {
  heroTitle: string;
  heroText: string;
  bgImageUrl: string;
}

export const StyledHomeHero = styled.section<{ bg: string }>`
  /* background-image: linear-gradient(
      90deg,
      rgba(13, 14, 15, 0.7) 10%,
      rgba(13, 14, 15, 0) 80%
    ),
    url(${({ bg }) => bg ?? "/images/hero-bg.jpeg"}); */
  background-image: url(${({ bg }) => bg ?? "/images/hero-bg.jpeg"});
  background-position: center;
  background-size: cover;
  background-position: top;
  padding: 350px 24px 80px 80px;
  h1 {
    ${Fonts.headingOne};
    color: ${Theme.colors.white};
    width: 100%;
    max-width: 300px;
  }
  p {
    ${Fonts.paragraphHero};
    color: ${Theme.colors.light};
    width: 100%;
    max-width: 500px;
  }
  ${mediaBreakpointDown(
    BREAKPOINTS.lg,
    css`
      padding: 100px 40px;
      h1 {
        font-size: 36px;
        line-height: 120%;
      }
      p {
        font-size: 18px;
      }
    `
  )}
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
`;

const HomeHero: React.FC<HomeHeroProps> = ({
  heroTitle,
  heroText,
  bgImageUrl,
}) => {
  const router = useRouter();

  const handleRoutePush = (path: keyof typeof PUBLIC_ROUTES) => {
    router.push(PUBLIC_ROUTES[path]);
  };
  return (
    <StyledHomeHero bg={bgImageUrl}>
      <Row>
        <Col xs={12} md={8}>
          <Stack gap={4}>
            <h1>{heroTitle}</h1>
            <p className="text-start">{heroText}</p>
            <Stack direction="horizontal" gap={4} className="flex-wrap">
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
        </Col>
      </Row>
    </StyledHomeHero>
  );
};

export default HomeHero;
