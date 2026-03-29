import Theme from "@/src/theme";
import { Stack } from "react-bootstrap";
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

export default function SermonHero() {
  return (
    <StyledWrapper>
      <h2>
        &quot;The Power of the Word - A Collection of Inspiring Sermons&quot;
      </h2>
      <p>
        Welcome to our collection of powerful and uplifting sermons that have
        been carefully crafted to help you deepen your faith and discover the
        truth of God&apos;s Word. Each sermon is designed to bring you closer to
        the heart of God and to equip you with the tools you need to live a life
        of purpose, hope, and joy. Here, you will find a variety of sermons
        covering a range of topics, including faith, hope, love, redemption, and
        more. Whether you&apos;re seeking guidance in a difficult time, looking
        to deepen your understanding of the Bible, or simply seeking inspiration
        and encouragement, you&apos;ll find it all here. So, explore our
        collection of sermons and be inspired by the power of the Word. May
        these messages encourage you, challenge you, and strengthen you in your
        walk with the Lord.
      </p>
    </StyledWrapper>
  );
}
