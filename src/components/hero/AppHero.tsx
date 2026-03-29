import Theme from "@/src/theme";
import styled from "@emotion/styled";
import Fonts from "@/src/theme/fonts";
import { BREAKPOINTS, mediaBreakpointDown } from "@/src/theme/breakpoints";
import { css } from "styled-components";

const StyledWrapper = styled.div`
  background: ${Theme.colors.grey};
  padding: 110px 10% 200px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  h2 {
    ${Fonts.headingFour};
    color: ${Theme.colors.white};
    margin-bottom: 38px;
  }

  p {
    ${Fonts.paragraphSmall};
    color: ${Theme.colors.smoke};
  }

  ${mediaBreakpointDown(
    BREAKPOINTS.md,
    css`
       {
        padding: 50px 5%;
        h2 {
          font-size: 24px;
        }
      }
    `
  )}
`;

interface IAppHeroProps {
  title: string;
  subtitle: string;
}

export default function AppHero(props: IAppHeroProps) {
const {title, subtitle} = props;

  return (
    <StyledWrapper>
      <h2>
       {title}
      </h2>
      <p>
       {subtitle}
      </p>
    </StyledWrapper>
  );
}
