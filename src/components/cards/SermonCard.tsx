import Theme from "@/src/theme";
import Fonts from "@/src/theme/fonts";
import styled from "@emotion/styled";
import Image from "next/image";
import { Card, Stack } from "react-bootstrap";
import { css } from "styled-components";
import { BREAKPOINTS, mediaBreakpointDown } from "@/src/theme/breakpoints";

const StyledCardWrapper = styled(Card)`
  border-radius: 20px;
  padding: 30px 30px 60px;
  max-width: 360px;

  .title {
    ${Fonts.headingTitle};
    color: ${Theme.colors.black};
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

const StyledImage = styled(Image)`
  border-radius: 10px;
`;

interface ISermonCardProps {
  image: string;
  title: string;
}

export default function SermonCard(props: ISermonCardProps) {
  const { image, title } = props;
  return (
    <StyledCardWrapper>
      <StyledImage
        src={image}
        alt={title}
        width={300}
        height={220}
        layout="responsive"
      />
      <Stack direction="horizontal" gap={3} className="my-4">
        <Image src="/images/play-btn.png" alt={title} width={35} height={35} />
        <Image src="/images/music-btn.png" alt={title} width={35} height={35} />
        <Image src="/images/file-btn.png" alt={title} width={35} height={35} />
      </Stack>
      <div className="title">{title}</div>
    </StyledCardWrapper>
  );
}
