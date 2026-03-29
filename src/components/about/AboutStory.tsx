import Theme from "@/src/theme";
import { Col, Container, Row } from "react-bootstrap";
import styled from "@emotion/styled";
import Fonts from "@/src/theme/fonts";
import { BREAKPOINTS, mediaBreakpointDown } from "@/src/theme/breakpoints";
import { css } from "styled-components";
import { t } from "@lingui/macro";

const StyledWrapper = styled.div`
  padding: 80px 0 130px;
  color: ${Theme.colors.darkGrey};

  h2 {
    ${Fonts.headingTwo}
  }

  p {
    ${Fonts.paragraphNormal}
    margin: 0;
  }

  ${mediaBreakpointDown(
    BREAKPOINTS.md,
    css`
      padding: 24px;
    `
  )}
`;

export default function AboutStory() {
  return (
    <StyledWrapper>
      <Container>
        <Row className="mb-4">
          <Col xs={12} lg={3} className="mb-3 mb-md-4">
            <h2>{t`Covenant parish prague Story`}</h2>
          </Col>
          <Col xs={12} lg={9} className="text-divs">
            <p>
              {t`The Covenant Parish is a part of the Redeemed Christian Church of God (RCCG) Worldwide with Headquarters in Lagos, Nigeria. The Redeemed Christian Church of God (RCCG) was founded in 1952 by late Rev. Josiah Akindayomi, its first General Overseer.`}
            </p>
            <p>
              {t`The current General Overseer, Pastor E. A Adeboye (fondly called Daddy G.O) has been used mightily by God, to bring phenomenal growth, innovation and expansion to the church, in fulfillment of the covenant the founder had with the Almighty God.`}
            </p>
          </Col>
        </Row>
      </Container>
    </StyledWrapper>
  );
}
