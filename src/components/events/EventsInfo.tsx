import styled from "@emotion/styled";
import TopOverflow from "../common/TopOverflow";
import { Col, Row } from "react-bootstrap";
import EventCard from "../cards/EventCard";
import { useGetEvents } from "@/src/hooks/useEvents";
import Loader from "../common/loader/Loader";
import { differenceInDays, format } from "date-fns";
import { t } from "@lingui/macro";
import { useRouter } from "next/router";
import { cs, enGB } from "date-fns/locale";
import { swithObjectValues } from "@/src/utils/data";

const StyledEvents = styled.div`
  margin-bottom: 100px;
`;

export default function EventsInfo() {
  const { locale } = useRouter();
  const { data: eventData, isLoading } = useGetEvents();

  const dateLocale = swithObjectValues(locale ?? "en", {
    en: enGB,
    cs,
  });

  return (
    <TopOverflow>
      <Loader isLoading={isLoading}>
        <StyledEvents>
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
                  <Col xs={12} md={6} lg={4} key={index}>
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
        </StyledEvents>
      </Loader>
    </TopOverflow>
  );
}
