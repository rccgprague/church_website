import Theme from "@/src/theme";
import styled from "@emotion/styled";
import { BREAKPOINTS, mediaBreakpointDown } from "@/src/theme/breakpoints";
import { css } from "styled-components";
import { StyledOrangeButton } from "../hero/HomeHero";
import ContactCard from "../cards/ContactCard";
import { Col, Form, Row, Stack } from "react-bootstrap";
import { ContactData } from "@/src/constants/dummyData";
import Fonts from "@/src/theme/fonts";
import { t } from "@lingui/macro";

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .contact-section {
    color: ${Theme.colors.black};
    font-family: "Arimo";
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
  }

  h2 {
    ${Fonts.headingTwo}
  }

  h3 {
    ${Fonts.headingThree}
  }

  p {
    ${Fonts.paragraphSmall}
  }

  ${mediaBreakpointDown(
    BREAKPOINTS.lg,
    css`
       {
        .contact-section {
          margin-top: 40px;
        }
      }
    `
  )}
`;

const StyledDiv = styled.div`
  margin-top: -100px;
  border-radius: 20px;
  background-color: white;
  width: 80%;
  padding: 50px;

  ${mediaBreakpointDown(
    BREAKPOINTS.lg,
    css`
       {
        margin-top: -50px;
        padding: 50px 24px;
        gap: 20px;
        flex-wrap: wrap;
      }
    `
  )}
`;

const StyledSendBtn = styled(StyledOrangeButton)`
  border-radius: 5px;

  :hover {
    background: ${Theme.colors.orange};
  }
  margin: 0 auto;
`;

const StyledFormSection = styled.div`
  background: ${Theme.colors.white};
  border: 1px solid #f1f6fe;
  box-shadow: 24px 36px 64px -14px rgba(21, 37, 63, 0.11);
  border-radius: 20px;
  padding: 64px;
  width: 60%;
  margin-bottom: 200px;

  .policy {
    font-size: 12px;

    span {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .form-control {
    background: ${Theme.colors.graybg};
    border-radius: 5px;
    border: 1.5px solid #f8f2f2;
  }

  ${mediaBreakpointDown(
    BREAKPOINTS.lg,
    css`
      width: 100%;
      border-radius: 0;
      padding: 50px 24px;
    `
  )}
`;

export default function ContactInfo() {
  return (
    <StyledWrapper>
      <StyledDiv>
        <Row className="justify-content-center">
          {ContactData.map((data, index) => {
            const { icon, subtitle, title } = data;

            return (
              <Col key={index} xs={12} md={6} lg={4} className="mb-4">
                <ContactCard title={title} subtitle={subtitle} icon={icon} />
              </Col>
            );
          })}
        </Row>
      </StyledDiv>

      <Stack className="my-5 text-center">
        <h3>{t`Contact section`}</h3>
        <h2>{t`Fill the form`}</h2>
      </Stack>

      <StyledFormSection>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>{t`Your Name`} *</Form.Label>
            <Form.Control placeholder={t`Your name`} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{t`Email address`} *</Form.Label>
            <Form.Control type="email" placeholder={t`Your email`} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{t`Message `}*</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder={t`Type your message here`}
            />
          </Form.Group>

          <hr className="my-5 w-100" />

          <Stack gap={5}>
            <Stack
              direction="horizontal"
              className="align-item-center gap-3 gap-lg-5"
            >
              <Form.Check />
              <p className="m-0">
                {t`I agree with`} <span>{t`Terms of Use`}</span> {t`and`}{" "}
                <span>{t`Privacy Policy`}</span>.
              </p>
            </Stack>
            <div>
              <StyledSendBtn type="submit">{t`Send Message`}</StyledSendBtn>
            </div>
          </Stack>
        </Form>
      </StyledFormSection>
    </StyledWrapper>
  );
}
