import Theme from "@/src/theme";
import { Col, Container, Row } from "react-bootstrap";
import styled from "@emotion/styled";
import Fonts from "@/src/theme/fonts";
import { BREAKPOINTS, mediaBreakpointDown } from "@/src/theme/breakpoints";
import { css } from "styled-components";
import { t } from "@lingui/macro";
import { PortableText } from "@portabletext/react";
import { PostResponse } from "@/src/types/post";

const StyledWrapper = styled.div`
  padding: 80px 0 20px;
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

export default function BlogDetailContent({
  content,
}: {
  content: PostResponse["body"];
}) {
  return (
    <StyledWrapper>
      <Container>
        <Row className="mb-4">
          <Col xs={12} lg={3} className="mb-3 mb-md-4">
            <h2>{t`Covenant parish digital library content`}</h2>
          </Col>
          <Col xs={12} lg={9} className="text-divs">
            <PortableText value={content} />
          </Col>
        </Row>
      </Container>
    </StyledWrapper>
  );
}
