import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Fonts from "@/src/theme/fonts";
import { Container, Carousel } from "react-bootstrap";
import { BREAKPOINTS, mediaBreakpointDown } from "../theme/breakpoints";
import { css } from "styled-components";
import { useGetTestimonials } from "../hooks/useTestimonials";
import Loader from "./common/loader/Loader";
import { t } from "@lingui/macro";
import { TestimonialResponse } from "../types/testimonial";

const StyledHomeSlider = styled.section`
  text-align: center;
  padding: 100px 40px;
  .carousel-indicators [data-bs-target] {
    display: none;
  }
  .carousel-inner {
    padding-left: 180px;
    padding-right: 180px;
    ${mediaBreakpointDown(
      BREAKPOINTS.lg,
      css`
         {
          padding-left: 0;
          padding-right: 0;
        }
      `
    )}
  }
  .carousel-control-prev {
    opacity: 1 !important;
  }
  .carousel-control-next {
    opacity: 1 !important;
  }
  .carousel-control-prev-icon {
    background-image: url("/images/icons/prev-icon.svg") !important;
    padding: 30px;
    ${mediaBreakpointDown(
      BREAKPOINTS.md,
      css`
         {
          padding: 0;
        }
      `
    )}
  }
  .carousel-control-next-icon {
    background-image: url("/images/icons/next-icon.svg") !important;
    padding: 30px;
    ${mediaBreakpointDown(
      BREAKPOINTS.md,
      css`
         {
          padding: 0;
        }
      `
    )}
  }
  .message {
    font-size: 20px;
    line-height: 150%;
    width: 100%;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  h3 {
    ${Fonts.headingTwo};
    text-transform: uppercase;
    margin-bottom: 70px;
  }
  p {
    margin-bottom: 16px;
    font-family: "Jost";
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    line-height: 0px;
    text-align: center;
  }

  ${mediaBreakpointDown(
    BREAKPOINTS.md,
    css`
       {
        padding: 60px 24px;
      }
    `
  )}
`;

const StyledProfileImage = styled(Image)`
  object-fit: cover;
  border-radius: 50%;
  object-position: top;
`;

type HomeSliderProps = {
  data: TestimonialResponse[];
};

const HomeSlider: React.FC<HomeSliderProps> = ({
  data: initialTestimonial,
}) => {
  const { data, isLoading } = useGetTestimonials(initialTestimonial);
  return (
    <Loader isLoading={isLoading}>
      <StyledHomeSlider>
        <Container>
          <h3 className="mb-5">{t`Testimonials`}</h3>
          <Carousel>
            {data?.map((data) => {
              const { _id, name, message, imageUrl } = data;
              return (
                <Carousel.Item key={_id} interval={5000}>
                  <StyledProfileImage
                    src={imageUrl}
                    width={146}
                    height={146}
                    alt={name}
                    className="align-self-center mb-4"
                  />
                  <p className="mb-4 message">{message}</p>
                  <p>- {name}</p>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Container>
      </StyledHomeSlider>
    </Loader>
  );
};

export default HomeSlider;
