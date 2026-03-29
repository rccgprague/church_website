import Theme from "@/src/theme";
import { Col, Container, Row, Stack } from "react-bootstrap";
import styled from "@emotion/styled";
import Fonts from "@/src/theme/fonts";
import { BREAKPOINTS, mediaBreakpointDown } from "@/src/theme/breakpoints";
import { css } from "styled-components";
import { t } from "@lingui/macro";

const StyledWrapper = styled.div`
  color: ${Theme.colors.darkGrey};

  h2 {
    ${Fonts.headingTwo}
  }

  p {
    ${Fonts.paragraphSmall}
    &.first-paragraph {
      ${Fonts.paragraphNormal}
      max-width: 700px;
    }
  }

  ${mediaBreakpointDown(
    BREAKPOINTS.md,
    css`
      padding: 24px;
      p {
        &:first-of-type {
          font-size: 16px;
        }
      }
    `
  )}
`;

export default function MoreEventsHeader() {
  return (
    <StyledWrapper>
      <Container>
        <Row className="mb-4">
          <Col xs={12} lg={3} className="mb-3 mb-md-4">
            <h2>{t`More Events`}</h2>
          </Col>
          <Col xs={12} lg={9} className="text-divs">
            <p className="first-paragraph">
              {t`We invite you to join us for a special celebration of the
              resurrection of Jesus Christ, and to discover the hope that`}
            </p>
          </Col>
        </Row>
      </Container>
    </StyledWrapper>
  );
}
