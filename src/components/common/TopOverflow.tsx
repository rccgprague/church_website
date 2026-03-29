import styled from "@emotion/styled";
import { Col, Container, Row } from "react-bootstrap";
import { BREAKPOINTS, mediaBreakpointDown } from "@/src/theme/breakpoints";
import { css } from "styled-components";
import { HTMLAttributes } from "react";

const StyledTopOverflowSection = styled.div`
  margin: -100px 0 0;

  ${mediaBreakpointDown(
    BREAKPOINTS.md,
    css`
      margin-bottom: 40px;
    `
  )}
`;

interface TopOverflowProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const TopOverflow: React.FC<TopOverflowProps> = ({ children, ...props }) => {
  return (
    <StyledTopOverflowSection {...props}>
      <Container>
        <Row className="mx-auto">
          <Col xs={12}>{children}</Col>
        </Row>
      </Container>
    </StyledTopOverflowSection>
  );
};

export default TopOverflow;
