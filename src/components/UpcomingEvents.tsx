import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "@emotion/styled";
import Theme from "../theme";
import EventCard from "./cards/EventCard";
import SeeAllButton from "./buttons/SeeAllButton";
import Headings from "./typography/Headings";
import { BREAKPOINTS, mediaBreakpointDown } from "../theme/breakpoints";
import { css } from "styled-components";
import { useRouter } from "next/router";
import { useGetEvents } from "../hooks/useEvents";
import Loader from "./common/loader/Loader";
import { differenceInDays, format } from "date-fns";
import { t } from "@lingui/macro";
import Fonts from "../theme/fonts";
import { enGB, cs } from "date-fns/locale";
import { swithObjectValues } from "../utils/data";
import { EventsResponse } from "../types/events";

const StyledUpcomingEventSection = styled.section`
  background-color: ${Theme.colors.white};
  width: 80%;
  margin: 0 auto;
  padding-top: 120px;
  padding-bottom: 160px;
  .card__body {
    background-color: ${Theme.colors.black};
  }

  ${mediaBreakpointDown(
    BREAKPOINTS.md,
    css`
       {
        width: 100%;
        padding: 60px 24px;
      }
    `
  )}
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    ${Fonts.headingTwo}
  }

  ${mediaBreakpointDown(
    BREAKPOINTS.md,
    css`
       {
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 20px;

        h3 {
          font-size: 24px;
        }
      }
    `
  )}
`;

type UpcomingEventsProps = {
  data: EventsResponse[];
  locale: string;
};

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ data, locale }) => {
  const router = useRouter();
  const { data: eventData, isLoading } = useGetEvents(data, locale);

  const handleEventsClick = () => {
    router.push("/events");
  };

  const dateLocale = swithObjectValues(router.locale ?? "en", {
    en: enGB,
    cs,
  });

  return (
    <Loader isLoading={isLoading}>
      <StyledUpcomingEventSection>
        <Container fluid>
          <HeaderRow className="mb-5">
            <Headings>{t`Upcoming Events`}</Headings>
            <SeeAllButton
              label={t`See All Events`}
              onClick={handleEventsClick}
            />
          </HeaderRow>
          <Row className="gy-4 justify-xs-content-center justify-md-content-start">
            {eventData
              ?.sort((a, b) =>
                differenceInDays(
                  new Date(a.startDateTime),
                  new Date(b.startDateTime)
                )
              )
              .map((data, index) => {
                const {
                  title,
                  imageUrl,
                  venue,
                  startDateTime,
                  recurring,
                  slug,
                } = data;

                const subtitle = recurring
                  ? `${t`Every`} ${format(new Date(startDateTime), "EEEE", {
                      locale: dateLocale,
                    })}`
                  : format(new Date(startDateTime), "EEEE, do MMMM yyyy", {
                      locale: dateLocale,
                    });

                return (
                  <Col xs={12} md={6} lg={4} key={data._id}>
                    <EventCard
                      image={imageUrl}
                      subtitle={subtitle}
                      info={title}
                      title={venue}
                      slug={slug.current}
                    />
                  </Col>
                );
              })}
          </Row>
        </Container>
      </StyledUpcomingEventSection>
    </Loader>
  );
};

export default UpcomingEvents;
