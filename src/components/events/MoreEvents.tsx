import { Container, Row, Col } from "react-bootstrap";
import EventCard from "../cards/EventCard";
import MoreEventsHeader from "./MoreEventsHeader";
import styled from "@emotion/styled";
import { mediaBreakpointDown, BREAKPOINTS } from "@/src/theme/breakpoints";
import { css } from "styled-components";
import { useGetEvents } from "@/src/hooks/useEvents";
import { differenceInDays, format } from "date-fns";
import Loader from "../common/loader/Loader";

const StyledMoreEvents = styled.div`
  padding: 0 24px 60px;
  ${mediaBreakpointDown(
    BREAKPOINTS.md,
    css`
       {
        padding: 40px 24px;
      }
    `
  )}
`;

const MoreEvents = () => {
  const { data: eventData, isLoading } = useGetEvents();
  return (
    <Loader isLoading={isLoading}>
      <StyledMoreEvents>
        <Container>
          <hr className="mb-5 w-100" />
          <Row>
            <MoreEventsHeader />
            {eventData
              ?.sort((a, b) =>
                differenceInDays(
                  new Date(a.startDateTime),
                  new Date(b.startDateTime)
                )
              )
              .slice(0, 3)
              .map((data, index) => {
                const {
                  title,
                  imageUrl,
                  venue,
                  startDateTime,
                  recurring,
                  slug,
                } = data;
                return (
                  <Col xs={12} md={6} lg={4} key={index} className="mb-5">
                    <EventCard
                      image={imageUrl}
                      subtitle={
                        recurring
                          ? `Every ${format(new Date(startDateTime), "EEEE")}`
                          : format(new Date(startDateTime), "EEEE")
                      }
                      info={title}
                      title={venue}
                      slug={slug.current}
                    />
                  </Col>
                );
              })}
          </Row>
        </Container>
      </StyledMoreEvents>
    </Loader>
  );
};
export default MoreEvents;
