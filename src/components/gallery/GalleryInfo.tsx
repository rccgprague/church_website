import styled from "@emotion/styled";
import TopOverflow from "../common/TopOverflow";
import { SRLWrapper } from "simple-react-lightbox";
import ImageItem from "./ImageItem";
import { mediaBreakpointDown, BREAKPOINTS } from "@/src/theme/breakpoints";
import { css } from "styled-components";
import { useGetGalleryImages } from "@/src/hooks/useGallery";
import Loader from "../common/loader/Loader";

const StyledSRLWrapper = styled.div`
  margin: -50px 0 100px;
  div {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: center;
  }

  ${mediaBreakpointDown(
    BREAKPOINTS.md,
    css`
      margin: 0 0 50px;
    `
  )}
`;

export default function GalleryInfo() {
  const { data, isLoading } = useGetGalleryImages();
  return (
    <TopOverflow>
      <Loader isLoading={isLoading}>
        <StyledSRLWrapper>
          <SRLWrapper>
            {data?.[0]?.images
              ?.map((url, index) => (
                <ImageItem
                  key={`${data?.[0]?._id}-${index}`}
                  src={url}
                  width={300}
                  height={300}
                  alt={data?.[0]?.title}
                />
              ))
              .reverse()}
          </SRLWrapper>
        </StyledSRLWrapper>
      </Loader>
    </TopOverflow>
  );
}
