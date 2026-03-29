import Theme from "@/src/theme";
import Fonts from "@/src/theme/fonts";
import styled from "@emotion/styled";
import Image from "next/image";
import { Card, Stack } from "react-bootstrap";
import { css } from "styled-components";
import { BREAKPOINTS, mediaBreakpointDown } from "@/src/theme/breakpoints";

const StyledCardWrapper = styled(Card)`
  padding: 60px 30px 0;
  min-width: 300px;
  box-shadow: 0px 19px 20px rgba(72, 72, 72, 0.06);

  p {
    font-size: 16px !important;
    color: ${Theme.colors.black} !important;
  }

  span {
    color: ${Theme.colors.smoke};
  }

  .title {
    ${Fonts.headingTitle};
    color: ${Theme.colors.black};
    margin: 33px 0;
  }

  .top-date {
    color: ${Theme.colors.white};
    background: ${Theme.colors.blue};
    font-size: 16px;
    width: 120px;
    text-align: center;
  }

  ${mediaBreakpointDown(
    BREAKPOINTS.md,
    css`
       {
        padding: 20px 10px 40px;
      }
    `
  )}
`;

interface ISermonCardProps {
  eventDate: string;
  title: string;
  speaker: string;
  category: string;
  date: string;
}

export default function SermonDetailCard(props: ISermonCardProps) {
  const { eventDate, title, speaker, category, date } = props;
  return (
    <StyledCardWrapper>
      <Image src={"/images/calendar.png"} alt={title} width={51} height={39} />
      <div className="top-date">{eventDate}</div>
      <div className="title">{title}</div>
      <hr className="w-100 mb-5" />
      <Stack>
        <p>
          Sermon By: <span>{speaker}</span>
        </p>
        <p>
          Categories: <span>{category}</span>
        </p>
        <p>
          Date: <span>{date}</span>
        </p>
      </Stack>
    </StyledCardWrapper>
  );
}
