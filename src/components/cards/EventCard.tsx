import { Card, Stack } from "react-bootstrap";
import styled from "@emotion/styled";
import Theme from "@/src/theme";
import Fonts from "@/src/theme/fonts";
import EventCardButton from "../buttons/EventCardButton";
import { BREAKPOINTS, mediaBreakpointDown } from "@/src/theme/breakpoints";
import { css } from "styled-components";
import { useRouter } from "next/router";
import { t } from "@lingui/macro";

const StyledEventCard = styled(Card)`
  width: 100%;
  padding: 0;
  height: 507px;
  border-radius: 8px;
  color: ${Theme.colors.white};
  border: none;
  span {
    ${Fonts.cardButton};
  }
  .card-head {
    ${Fonts.cardTitle};
  }

  .card__body {
    background-color: ${Theme.colors.black};
    display: flex;
    flex-direction: column;
    gap: 48px;
  }

  .card_img {
    object-fit: cover;
    object-position: top;
  }

  .card-heading {
    ${Fonts.headingTwo};
  }

  ${mediaBreakpointDown(
    BREAKPOINTS.md,
    css`
      .card-heading {
        font-size: 24px;
      }
    `
  )}
`;

interface IEventCardProps {
  image: string;
  title: string;
  subtitle: string;
  info: string;
  slug: string;
}

const EventCard: React.FC<IEventCardProps> = ({
  image,
  info,
  subtitle,
  title,
  slug,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/events/${slug}`);
  };
  return (
    <StyledEventCard>
      <Card.Img
        height={240}
        className="card_img"
        variant="top"
        src={image}
        alt={title}
      />
      <Card.Body className="card__body">
        <Card.Title className="card-head">{title} </Card.Title>
        <Stack gap={3}>
          <Card.Subtitle> {subtitle} </Card.Subtitle>
          <h2 className="card-heading"> {info} </h2>
        </Stack>
        <EventCardButton label={t`Join Event`} onClick={handleCardClick} />
      </Card.Body>
    </StyledEventCard>
  );
};

export default EventCard;
