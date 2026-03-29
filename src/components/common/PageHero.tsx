import Theme from "@/src/theme";
import { Col, Container, Row, Stack } from "react-bootstrap";
import styled from "@emotion/styled";
import Fonts from "@/src/theme/fonts";
import { BREAKPOINTS, mediaBreakpointDown } from "@/src/theme/breakpoints";
import { css } from "styled-components";
import Image from "next/image";

const StyledWrapper = styled.div<{ variant: "default" | "post" }>`
  padding: ${({ variant }) =>
    `${variant === "default" ? "80px 0 130px" : "80px 0 10px"}`};
  background: ${Theme.colors.grey};
  color: ${Theme.colors.white};

  h2 {
    ${Fonts.headingTwo}
  }

  p {
    ${Fonts.paragraphNormal};
    color: ${Theme.colors.smoke};
    margin: 0;
  }

  ${mediaBreakpointDown(
    BREAKPOINTS.md,
    css`
      padding: 50px 24px 100px;
    `
  )}
`;

const StyledHeroImage = styled(Image)`
  border-radius: 8px;
  max-width: 450px;
  width: 100%;
  height: auto;
`;

type PageHeroProps = {
  title: string;
  paragraph1: string;
  paragraph2?: string;
  paragraph3?: string;
  variant?: "default" | "post";
  isImage?: boolean;
};

export default function PageHero({
  title,
  paragraph1,
  paragraph2,
  paragraph3,
  variant = "default",
  isImage = false,
}: PageHeroProps) {
  return (
    <StyledWrapper variant={variant}>
      <Container>
        <Row className="mb-4">
          <Col xs={12} lg={5} className="mb-3 mb-md-4">
            <Stack gap={3}>
              <h2>{title}</h2>
              {isImage && (
                <StyledHeroImage
                  src="https://cdn.sanity.io/images/5mgvsu5h/production/6b00e9621e3cf895ac0279c629e2d8d1b64861be-6000x4000.jpg"
                  width={450}
                  height={250}
                  alt={"About Image"}
                />
              )}
            </Stack>
          </Col>
          <Col xs={12} lg={7} className="text-divs">
            <p>{paragraph1}</p>
            {paragraph2 && <p>{paragraph2}</p>}
            {paragraph3 && <p>{paragraph3} </p>}
          </Col>
        </Row>
      </Container>
    </StyledWrapper>
  );
}
