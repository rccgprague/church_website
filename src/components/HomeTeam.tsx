import React, { useState } from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import { Container, Row, Col, Stack } from "react-bootstrap";
import { GrFacebookOption, GrLinkedinOption } from "react-icons/gr";
import Fonts from "../theme/fonts";
import Theme from "../theme";
import Link from "next/link";
import { css } from "styled-components";
import { mediaBreakpointDown, BREAKPOINTS } from "../theme/breakpoints";
import { t } from "@lingui/macro";
import { useGetTeam } from "../hooks/useTeam";
import Loader from "./common/loader/Loader";
import Colors from "../theme/color";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { TeamResponse } from "../types/team";
import { motion } from "framer-motion";

const StyledHomeTeamSection = styled.section`
  background-color: #484848;
  padding: 80px 24px 20px;
  text-align: center;
  position: relative;
  h3 {
    ${Fonts.headingTwo};
    text-transform: uppercase;
    margin-bottom: 70px;
    color: ${Theme.colors.white};
  }
  h4 {
    ${Fonts.headingTitle};
    color: ${Theme.colors.white};
  }
  p {
    color: ${Theme.colors.secondaryWhite};
    font-size: 14px;
    text-align: center;
    &.biography {
      ${Fonts.paragraphNormal};
    }
  }
  li {
    list-style-type: none;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  ${mediaBreakpointDown(
    BREAKPOINTS.md,
    css`
      padding: 60px 24px;
    `
  )}
`;

const StyledProfileImage = styled(Image)`
  object-fit: cover;
  border-radius: 50%;
  object-position: top;
`;

const StyledTeamContent = styled(motion.div)`
  background: ${`linear-gradient(80deg, ${Colors.solidGrey} 40%, ${Colors.dark} 70%)`};
  padding: 40px;
  width: 80%;
  height: 80%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border-radius: 8px;
  overflow: auto;
  opacity: 0.95;
`;

const TeamContent = ({
  data,
  onClose,
}: {
  data: TeamResponse;
  onClose: () => void;
}) => {
  const { name, imageUrl, position, facebook, linkedin, biography } = data;
  return (
    <StyledTeamContent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5,
      }}
    >
      <Stack direction="horizontal" className="justify-content-end">
        <AiOutlineCloseCircle
          color={Colors.white}
          size={24}
          onClick={() => onClose()}
          className="cursor-pointer"
        />
      </Stack>
      <Stack
        direction="horizontal"
        gap={3}
        className="justify-content-center align-items-center"
      >
        <StyledProfileImage
          src={imageUrl}
          width={120}
          height={120}
          alt={name ?? "Team"}
          className="align-self-center"
        />
        <Stack className="justify-content-center">
          <h4 className="text-start">{name}</h4>
          <p className="text-start">{position}</p>
          <ul className="d-flex gap-4 p-0">
            <li>
              <Link href={facebook ?? ""} target="_blank" passHref>
                <GrFacebookOption size={18} color="#FFFFFF" />
              </Link>
            </li>
            {/* <li>
                        <Link href="#" passHref>
                          <GrTwitter size={18} color="#FFFFFF" />
                        </Link>
                      </li> */}
            {/* <li>
                        <Link href="#" passHref>
                          <GrInstagram size={18} color="#FFFFFF" />
                        </Link>
                      </li> */}
            <li>
              <Link href={linkedin ?? ""} target="_blank" passHref>
                <GrLinkedinOption size={18} color="#FFFFFF" />
              </Link>
            </li>
            {/* <li>
                        <Link href="#" passHref>
                          <GrYoutube size={18} color="#FFFFFF" />
                        </Link>
                      </li> */}
          </ul>
        </Stack>
      </Stack>
      <p className="mt-3 text-start biography">{biography}</p>
    </StyledTeamContent>
  );
};

type HomeTeamProps = {
  data: TeamResponse[];
  locale: string;
};

const HomeTeam: React.FC<HomeTeamProps> = ({ data: initialData, locale }) => {
  const { data, isLoading } = useGetTeam(initialData, locale);
  const [showContent, setShowContent] = useState(false);
  const [contentData, setContentData] = useState<TeamResponse>();

  const handleOpenContent = (data: TeamResponse) => {
    setShowContent(true);
    setContentData(data);
  };

  const handleCloseContent = () => {
    setShowContent(false);
  };

  return (
    <StyledHomeTeamSection>
      <Container>
        <h3>{t`Our Team`}</h3>
        <Row className="justify-content-center">
          <Loader isLoading={isLoading}>
            {showContent && contentData && (
              <TeamContent data={contentData} onClose={handleCloseContent} />
            )}
            {data?.map((data) => {
              const { _id, name, imageUrl, position, facebook, linkedin } =
                data;
              return (
                <Col
                  key={_id}
                  lg={4}
                  sm={6}
                  xs={12}
                  className="mb-5 cursor-pointer"
                  onClick={() => handleOpenContent(data)}
                >
                  <motion.div whileTap={{ scale: 0.97 }}>
                    <Stack gap={3}>
                      <StyledProfileImage
                        src={imageUrl}
                        width={267}
                        height={267}
                        alt={name ?? "Team"}
                        className="align-self-center"
                      />
                      <Stack gap={0}>
                        <h4>{name}</h4>
                        <p>{position}</p>
                        <ul className="d-flex justify-content-center gap-4 p-0">
                          <li>
                            <Link
                              href={facebook ?? ""}
                              target="_blank"
                              passHref
                            >
                              <GrFacebookOption size={18} color="#FFFFFF" />
                            </Link>
                          </li>
                          {/* <li>
                        <Link href="#" passHref>
                          <GrTwitter size={18} color="#FFFFFF" />
                        </Link>
                      </li> */}
                          {/* <li>
                        <Link href="#" passHref>
                          <GrInstagram size={18} color="#FFFFFF" />
                        </Link>
                      </li> */}
                          <li>
                            <Link
                              href={linkedin ?? ""}
                              target="_blank"
                              passHref
                            >
                              <GrLinkedinOption size={18} color="#FFFFFF" />
                            </Link>
                          </li>
                          {/* <li>
                        <Link href="#" passHref>
                          <GrYoutube size={18} color="#FFFFFF" />
                        </Link>
                      </li> */}
                        </ul>
                      </Stack>
                    </Stack>
                  </motion.div>
                </Col>
              );
            })}
          </Loader>
        </Row>
      </Container>
    </StyledHomeTeamSection>
  );
};

export default HomeTeam;
