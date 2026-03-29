import styled from "@emotion/styled";
import SermonHero from "./SermonHero";
import { BREAKPOINTS, mediaBreakpointDown } from "@/src/theme/breakpoints";
import { css } from "styled-components";
import Theme from "@/src/theme";
import Fonts from "@/src/theme/fonts";
import Image from "next/image";
import { Stack } from "react-bootstrap";
import SermonDetailCard from "../cards/SermonDetailCard";

const Wrapper = styled.div`
  position: relative;
`;

const StyledWrapper = styled.div`
  background: ${Theme.colors.white};
  position: relative;
  width: 70%;
  margin: 0 auto;
  border-radius: 20px;

  .top-div {
    display: flex;
    justify-content: start;
    align-items: start;
    min-width: 100%;
    gap: 30px;
    margin-bottom: 80px;

    p {
      ${Fonts.paragraphSmall}
      color: ${Theme.colors.smoke};
      font-size: 22px;
    }

    .first-div {
      ${Fonts.headingFour};
      color: ${Theme.colors.black};
      max-width: 452px;
    }

    .right-side {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      max-width: 700px;
      gap: 52px;

      div {
        ${Fonts.paragraphNormal}
        max-width: 700px;
        color: ${Theme.colors.black};
      }

      .title {
        ${Fonts.headingFour}
        color: ${Theme.colors.black};
      }
      .subtitle {
        text-transform: uppercase;
        font-size: 35px;
        font-family: "Jost";
      }
    }
  }

  ${mediaBreakpointDown(
    BREAKPOINTS.lg,
    css`
       {
        width: 100%;
        .top-div {
          flex-direction: column;
          padding: 20px;

          .first-div {
            min-width: 100%;
          }

          .right-side {
            min-width: 100%;

            div {
              min-width: 100%;
            }
          }
        }
      }
    `
  )}

  ${mediaBreakpointDown(
    BREAKPOINTS.sm,
    css`
       {
        .img-div {
          justify-content: center !important;
        }
      }
    `
  )}
`;

const StyledImageDiv = styled.div`
  border-radius: 20px;
  width: 100%;
  background: ${Theme.colors.white};
  margin-top: -100px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 100px;

  .watch {
    ${Fonts.cardTitle};
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 40px 80px;
    color: ${Theme.colors.black};
    font-size: 14px;
  }

  ${mediaBreakpointDown(
    BREAKPOINTS.lg,
    css`
       {
        margin-top: -50px;
      }
    `
  )}

  ${mediaBreakpointDown(
    BREAKPOINTS.sm,
    css`
       {
        .watch {
          flex-direction: column;
          gap: 20px;
        }
      }
    `
  )}
`;

const StyledImage = styled(Image)`
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export default function SermonDetails() {
  return (
    <Wrapper>
      <SermonHero />

      <StyledWrapper>
        <StyledImageDiv>
          <div className="watch">
            <div>
              <Stack gap={4}>
                <div>Watch now</div>
                <Stack gap={3} direction="horizontal">
                  <Image
                    src="/images/play-btn.png"
                    alt="img"
                    width={44}
                    height={44}
                  />
                  <Image
                    src="/images/music-btn.png"
                    alt="img"
                    width={44}
                    height={44}
                  />
                  <Image
                    src="/images/file-btn.png"
                    alt="img"
                    width={44}
                    height={44}
                  />
                </Stack>
              </Stack>
            </div>

            <div>
              <Stack gap={4}>
                <div>Download now</div>
                <Stack gap={3} direction="horizontal">
                  <Image
                    src="/images/play-btn.png"
                    alt="img"
                    width={44}
                    height={44}
                  />
                  <Image
                    src="/images/music-btn.png"
                    alt="img"
                    width={44}
                    height={44}
                  />
                  <Image
                    src="/images/file-btn.png"
                    alt="img"
                    width={44}
                    height={44}
                  />
                </Stack>
              </Stack>
            </div>
          </div>
          <StyledImage
            src="/images/sermon/preach1.png"
            alt="img"
            width={1000}
            height={400}
            layout="responsive"
          />
        </StyledImageDiv>

        <div className="top-div">
          <div className="first-div">
            <SermonDetailCard
              speaker="Rasalina & Gotarica"
              category="God Praying"
              date="September 15 @ 5:00 pm"
              title="Independent Day at Covenant Parish"
              eventDate="30.09.23"
            />
          </div>
          <div className="right-side">
            <div className="title">Covenant Parish Sermons Description</div>

            <p>
              Jesus is holy, loving, and worthy of all our worship and devotion.
              You will feel heaven in our Zegen Church. Join us and Praise the
              Lord Jesus. Mauri&apos;s id denim id Purus ornate incident. Aenean
              vel consequent risus. Proin viverra nisi at nisl imperdiet auctor.
              Donec ornare, est sed tincidunt placerat, sem mi suscipit mi, at
              varius enim sem at sem. Fusce tempus ex nibh, eget vulputate
              ligula ornare eget. Nunc facilisis erat at ligula blandit tempor.
              Pellentesque elit arcu, finibus ut rutrum vel, dapibus eget nisi.
              Suspendisse at venerates arcu, et accusant ante.congue ut faucibus
              et, mattis in ante. God comes to us in free and undeserved favor
              in the person of Jesus Christ who lived, died, and rose for us
              that we might belong to God and serve Christ in the world.
              Following Jesus, Presbyterians are engaged in the world…
              Presbyterians affirm that God comes to us with…
            </p>

            <Stack>
              <div className="subtitle">
                “all the way with Jesus, am going all the way, have made up my
                mind to serve him, have given my heart to love Him”
              </div>
              <hr className="mb-1 w-100" />
            </Stack>
            <p>
              Jesus is holy, loving, and worthy of all our worship and devotion.
              You will feel heaven in our Zegen Church. Join us and Praise the
              Lord Jesus. Mauri&apos;s id denim id Purus ornate incident. Aenean
              vel consequent risus. Proin viverra nisi at nisl imperdiet auctor.
              Donec ornare, est sed tincidunt placerat, sem mi suscipit mi, at
              varius enim sem at sem. Fusce tempus ex nibh, eget vulputate
              ligula ornare eget. Nunc facilisis erat at ligula blandit tempor
            </p>
          </div>
        </div>
      </StyledWrapper>
    </Wrapper>
  );
}
