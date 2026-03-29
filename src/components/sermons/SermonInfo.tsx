import Theme from "@/src/theme";
import styled from "@emotion/styled";
import { BREAKPOINTS, mediaBreakpointDown } from "@/src/theme/breakpoints";
import { css } from "styled-components";
import { SermonData } from "@/src/constants/dummyData";
import { StyledOrangeButton } from "../hero/HomeHero";
import SermonCard from "../cards/SermonCard";

const StyledWrapper = styled.div`
  position: relative;

  .load-more {
    display: flex;
    justify-content: center;
  }

  ${mediaBreakpointDown(
    BREAKPOINTS.lg,
    css`
       {
        width: 100%;
      }
    `
  )}
`;

const StyledImageDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -150px;
  border-radius: 20px;
  flex-wrap: wrap;
  gap: 40px;

  ${mediaBreakpointDown(
    BREAKPOINTS.lg,
    css`
       {
        margin-top: -50px;
        padding: 10px;
        justify-content: flex-start;
        gap: 20px;
      }
    `
  )}

  ${mediaBreakpointDown(
    BREAKPOINTS.sm,
    css`
       {
        justify-content: center;
      }
    `
  )}
`;

const StyledLoadBtn = styled(StyledOrangeButton)`
  :hover {
    background: ${Theme.colors.orange};
  }
  margin: 0 auto;
`;

export default function SermonInfo() {
  return (
    <StyledWrapper>
      <StyledImageDiv>
        {SermonData.map((data, index) => {
          const { title, image } = data;

          return <SermonCard key={index} image={image} title={title} />;
        })}
      </StyledImageDiv>
      <div className="load-more my-5">
        <StyledLoadBtn>Load More</StyledLoadBtn>
      </div>
    </StyledWrapper>
  );
}
