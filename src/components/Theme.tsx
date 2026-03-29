import styled from "@emotion/styled";
import Image from "next/image";
import * as React from "react";
import { Col, Row, Stack } from "react-bootstrap";
import Headings from "./typography/Headings";
import Fonts from "../theme/fonts";

const StyledTheme = styled.div`
  padding: 120px 0 0px;
  * {
    text-align: center;
    &.title {
      ${Fonts.footerHeading}
    }
    &.message {
      ${Fonts.headingTwo}
    }
    &.verse {
      ${Fonts.paragraphSmall}
    }
  }
`;

const StyledProfileImage = styled(Image)`
  object-fit: cover;
  border-radius: 50%;
  object-position: top;
`;

export interface IThemeProps {
  imageUrl: string;
  logoUrl: string;
  title: string;
  message: string;
  verse: string;
}

const Theme: React.FunctionComponent<IThemeProps> = ({
  imageUrl,
  logoUrl,
  title,
  message,
  verse,
}) => {
  return (
    <StyledTheme>
      <Row className="justify-content-center align-items-center gap-5 gap-lg-0">
        <Col md={3}>
          <StyledProfileImage
            src={imageUrl ?? ""}
            width={180}
            height={180}
            alt={title ?? "Team"}
            className="align-self-center"
          />
        </Col>
        <Col md={3}>
          <Stack gap={3} className="text-white">
            <p className="title">{title}</p>
            <Headings as="h3" className="message">
              {message}
            </Headings>
            <p className="verse">- {verse}</p>
          </Stack>
        </Col>
        <Col md={3}>
          <Image
            src={logoUrl}
            alt="RCCG Prague Logo"
            width={180}
            height={180}
            priority
          />
        </Col>
      </Row>
    </StyledTheme>
  );
};

export default Theme;
