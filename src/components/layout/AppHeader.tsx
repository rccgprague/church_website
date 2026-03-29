import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";
import Fonts from "@/src/theme/fonts";
import styled from "@emotion/styled";
import { BREAKPOINTS, mediaBreakpointDown } from "@/src/theme/breakpoints";
import Theme from "@/src/theme";
import { css } from "styled-components";
import { RxHamburgerMenu } from "react-icons/rx";
import { useRouter } from "next/router";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";

const StyledNavbar = styled(Navbar)<{ ishome: "true" | "false" }>`
  width: 100%;
  position: ${({ ishome }) => (ishome === "true" ? "absolute" : "relative")};
  z-index: 2;
  background: transparent;
  > div.container {
    .navbar-brand {
      display: flex;
    }
    .navbar-collapse {
      .navbar-nav {
        column-gap: 24px;
        row-gap: 16px;
        a.nav-link {
          ${Fonts.menu};
          color: ${({ ishome }) =>
            ishome === "true"
              ? `${Theme.colors.white}`
              : `${Theme.colors.black}`};
          align-self: center;
          &.flag-icon {
            ${Fonts.headingTwo}
          }
        }
      }
    }
  }
  ${mediaBreakpointDown(
    BREAKPOINTS.lg,
    css`
      background: #17181a;
      padding: 30px;
      .navbar-collapse {
        margin-top: 24px;
      }
      a {
        width: auto;
        &.nav-link {
          color: #ffffff !important;
        }
        .logo-img {
          width: 140px;
          height: auto;
        }
      }
    `
  )};
`;

const AppHeader = () => {
  const [isHome, setIsHome] = useState(false);
  const router = useRouter();

  /**
   * This hook is needed to subscribe your
   * component for changes if you use t`` macro
   */
  useLingui();

  const isCs = router.locale === "cs";
  const isEn = router.locale === "en";

  const handleLanguageSwitch = (lang: "en" | "cs") => {
    router.push(router.asPath, undefined, { locale: lang });
  };

  useEffect(() => {
    setIsHome(router.pathname === "/");
  }, [router]);

  return (
    <StyledNavbar collapseOnSelect expand="lg" ishome={`false`}>
      <Container className="justify-content-between align-item-center">
        <Nav.Link as={Link} href="/">
          <Navbar.Brand>
            <Image
              src={`/images/icons/logo-blue.png`}
              alt="RCCG Prague Logo"
              width={300}
              height={100}
              className="logo-img d-none d-lg-block"
              priority
            />
            <Image
              src={"/images/icons/logo-white.svg"}
              alt="RCCG Prague Logo"
              width={280}
              height={90}
              className="logo-img d-block d-lg-none"
              priority
            />
          </Navbar.Brand>
        </Nav.Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav">
          <RxHamburgerMenu
            style={{
              color: "#ffffff",
            }}
          />
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav" className="flex-grow-0">
          <Nav className="justify-content-center align-item-center mx-auto flex-wrap">
            <Nav.Link as={Link} href="/">
              {t`Home`}
            </Nav.Link>
            <Nav.Link as={Link} href="/about">
              {t`About`}
            </Nav.Link>
            <Nav.Link as={Link} href="/gallery">
              {t`Gallery`}
            </Nav.Link>
            <Nav.Link as={Link} href="/events">
              {t`Events`}
            </Nav.Link>
            <Nav.Link as={Link} href="/blog">
              {t`Digital Library`}
            </Nav.Link>
            <Nav.Link as={Link} href="/contact">
              {t`Contacts`}
            </Nav.Link>
            {isCs && (
              <Nav.Link
                onClick={() => handleLanguageSwitch("en")}
                className="flag-icon"
              >
                🇬🇧
              </Nav.Link>
            )}
            {isEn && (
              <Nav.Link
                onClick={() => handleLanguageSwitch("cs")}
                className="flag-icon"
              >
                🇨🇿
              </Nav.Link>
            )}
            {/* TODO: Search functionality */}
            {/* <Nav.Link>
              <FaSearch size={24} />
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};

export default AppHeader;
