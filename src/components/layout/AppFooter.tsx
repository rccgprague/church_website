import React, { useEffect } from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import styled from "@emotion/styled";
import Theme from "@/src/theme";
import Fonts from "@/src/theme/fonts";

import { HiLocationMarker } from "react-icons/hi";
import { BsTelephoneFill } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { mediaBreakpointDown, BREAKPOINTS } from "@/src/theme/breakpoints";
import { css } from "styled-components";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import Link from "next/link";
import Colors from "@/src/theme/color";
import { useGetFooterContent } from "@/src/hooks/useFooter";
import Loader from "../common/loader/Loader";
import { useRouter } from "next/router";
import { FooterResponse } from "@/src/types/footer";

const StyledFooter = styled.footer`
  background-color: ${Theme.colors.grey};
  padding: 100px 60px;
  a {
    ${Fonts.footerText};
    color: ${Colors.smoke};
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
  ul li {
    list-style: none;
  }
  .bank-details {
    margin-top: 73px;
    color: ${Theme.colors.smoke};
    ul {
      padding-left: 0;
    }
    ul li {
      list-style-type: none;
      ${Fonts.footerText};
    }
  }
  .subheader-details {
    ul {
      padding-left: 0;
    }
    ul li {
      list-style-type: none;
      ${Fonts.footerText};
      color: ${Theme.colors.smoke};
    }
  }

  ${mediaBreakpointDown(
    BREAKPOINTS.md,
    css`
      padding: 60px 24px;
    `
  )}
`;

const FooterHeader = styled.p`
  ${Fonts.footerHeading};
  color: ${Theme.colors.white};
`;

const FooterSubHeader = styled.p`
  ${Fonts.footerSubHeading};
  color: ${Theme.colors.white};
`;

const FooterText = styled.p`
  ${Fonts.footerText};
  color: ${Theme.colors.smoke};
  word-wrap: break-word;
`;

const StyledSiteAuthor = styled.p`
  color: ${Colors.white};
  a {
    color: ${Colors.white};
  }
`;

type AppFooterProps = {
  initialFooter: FooterResponse[];
  locale: string;
};

const AppFooter: React.FC<AppFooterProps> = ({
  initialFooter,
  locale: serverLocale,
}) => {
  /**
   * This hook is needed to subscribe your
   * component for changes if you use t`` macro
   */
  useLingui();
  const { locale } = useRouter();
  const { data, isLoading, refetch, isRefetching } = useGetFooterContent();
  const { about, bankDetails, banker } = data?.at(0) ?? {};
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const QUICK_LINKS = [
    { title: t`Home`, href: "/" },
    { title: t`About`, href: "/about" },
    { title: t`Gallery`, href: "/gallery" },
    { title: t`Events`, href: "/events" },
    { title: t`Digital Library`, href: "/blog" },
    { title: t`Contacts`, href: "/contact" },
  ];
  return (
    <Loader isLoading={isLoading || isRefetching}>
      <StyledFooter>
        <Container fluid>
          <Row>
            <Col md={6} lg={3} sm={6} xs={12} style={{ marginBottom: "55px" }}>
              <div className="footer-menu">
                <FooterHeader>{t`About us`}</FooterHeader>
                <FooterText>{about}</FooterText>
              </div>
            </Col>
            <Col md={6} lg={3} sm={6} xs={12} style={{ marginBottom: "55px" }}>
              <FooterHeader>{t`Our regular services`}</FooterHeader>
              <FooterSubHeader>{t`Sundays`}</FooterSubHeader>
              <div className="subheader-details">
                <ul>
                  <li>{t`Bible Study`} 12:30pm</li>
                  <li>{t`Celebration Service`} 1:00pm</li>
                </ul>
              </div>
              <div className="subheader-details">
                <FooterSubHeader>{t`Wednesdays`}</FooterSubHeader>
                <ul>
                  <li>{t`Online Bible`}</li>
                  <li>{t`Study`} 7:30pm - 9:00pm</li>
                </ul>
              </div>
              <div className="subheader-details">
                <FooterSubHeader>{t`Fridays`}</FooterSubHeader>
                <ul>
                  <li>{t`Prayer Meeting`} 6:00pm</li>
                </ul>
              </div>
            </Col>
            <Col md={6} lg={3} sm={6} xs={12} style={{ marginBottom: "55px" }}>
              <FooterHeader>{t`Bank details`}</FooterHeader>
              <FooterText>
                {bankDetails} <br /> <br />
                Christ The Redeemer’s Ministries z.s (Redeemed Christian Church
                of God, RCCG)
              </FooterText>
              <div className="bank-details">
                <FooterHeader>{t`Banker`}:</FooterHeader>
                <ul>
                  <li>Česká Spořitelna</li>
                  <li>{t`Account Number`}: 5469231319/0800</li>
                  <li>{t`IBAN`}: CZ77 0800 0000 0054 6923 1319</li>
                  <li>BIC(SWIFT): GIBACZPX</li>
                </ul>
              </div>
            </Col>
            <Col md={6} lg={3} sm={6} xs={12} style={{ marginBottom: "55px" }}>
              <FooterHeader>{t`Our location`}</FooterHeader>
              <ul>
                <li>
                  <HiLocationMarker
                    style={{
                      color: "#D14D42",
                      width: "16px",
                      height: "20.5px",
                      marginLeft: "-27px",
                      position: "absolute",
                    }}
                  />{" "}
                  <FooterText>
                    Štúrova 1282/12, Prague 4-Krč Modrý Pavilon{" "}
                    {t`Prague, Czech Republic`}
                  </FooterText>
                </li>
                <li>
                  <BsTelephoneFill
                    style={{
                      color: "#D14D42",
                      width: "15.08px",
                      height: "15.72px",
                      marginLeft: "-27px",
                      position: "absolute",
                    }}
                  />{" "}
                  <FooterText>
                    <span>+420(777)114-779</span> <br />
                    <span>+420 (776) 563-684</span> <br />
                    <span>+420 (778) 824-547</span>
                  </FooterText>
                </li>
                <li>
                  <FooterText className="m-0">
                    covenantparishprague@gmail.com
                  </FooterText>
                </li>
              </ul>
            </Col>
          </Row>
          <Row className="mb-5">
            <FooterHeader className="text-lg-center">
              {t`Quick Links`}
            </FooterHeader>
            <Stack
              direction="horizontal"
              gap={3}
              className="flex-wrap justify-content-lg-center"
            >
              {QUICK_LINKS.map((link) => {
                return (
                  <Link key={link.href} href={link.href}>
                    {link.title}
                  </Link>
                );
              })}
            </Stack>
          </Row>
          <Row>
            <FooterHeader className="text-lg-center">
              {t`Our Social Networks`}
            </FooterHeader>
            <ul className="d-flex justify-content-lg-center">
              <li>
                <a
                  href="https://www.facebook.com/rccgcovenantparishprague/"
                  target="_blank"
                >
                  <FaFacebook
                    style={{
                      width: "30px",
                      height: "30px",
                      color: "#D14D42",
                      marginRight: "20px",
                    }}
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/rccg_covenant_parish_prague"
                  target="_blank"
                >
                  <RiInstagramFill
                    style={{
                      color: "#D14D42",
                      width: "30px",
                      height: "30px",
                    }}
                  />
                </a>
              </li>
            </ul>
            <FooterSubHeader className="text-lg-center mt-4">
              © 2023 Redeemed Christian Church of God (RCCG){" "}
              {t`Prague Czech Republic | All Rights Reserved | Data Privacy`}
            </FooterSubHeader>
            <StyledSiteAuthor className="text-lg-center mt-4">
              {t`Built by`}{" "}
              <Link href="https://stacksuit.com" target="_blank">
                Stacksuit
              </Link>
            </StyledSiteAuthor>
          </Row>
        </Container>
      </StyledFooter>
    </Loader>
  );
};

export default AppFooter;
