import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import Fonts from "@/src/theme/fonts";
import Theme from "@/src/theme";
import { Button, Stack } from "react-bootstrap";
import { FiArrowUpRight } from "react-icons/fi";
import { BREAKPOINTS, mediaBreakpointDown } from "../theme/breakpoints";
import { css } from "styled-components";
import { t } from "@lingui/macro";
import { useGetPosts } from "../hooks/usePosts";
import { useRouter } from "next/router";
import { PUBLIC_ROUTES } from "../constants/routes";
import Loader from "./common/loader/Loader";
import Colors from "../theme/color";
import { enGB, cs } from "date-fns/locale";
import { swithObjectValues } from "../utils/data";
import { format } from "date-fns";
import { PostResponse } from "../types/post";

const StyledPostSection = styled.div`
  width: 70%;
  margin: 0 auto;
  background-color: ${Theme.colors.dark};
  box-shadow: 0px 25px 70px rgba(0, 0, 0, 0.04);
  border-radius: 20px;
  padding: 60px;
  margin-bottom: 75px;

  .postDiv {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
  }
  .post-title {
    ${Fonts.paragraphNormal};
    color: ${Theme.colors.white};
    max-width: 400px;
    width: 100%;
  }
  a {
    color: ${Theme.colors.white};
    cursor: pointer;
  }
  p {
    color: #cdcdcd;
    ${Fonts.paragraphSmall}
  }
  .read-more {
    display: flex;
    justify-content: end;
    a {
      text-decoration: none;
      span {
        margin-left: 20px;
        text-transform: capitalize;
      }
      :hover {
        color: ${Theme.colors.orange};
      }
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    row-gap: 20px;
    margin-bottom: 48px;

    h1 {
      ${Fonts.sliderText};
      color: ${Theme.colors.white};
    }

    h2 {
      ${Fonts.headingTwo};
      color: ${Colors.white};
    }
  }

  .post-div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 1px solid #515658;
    padding: 20px 0;
    gap: 24px;
    flex-wrap: wrap;
    > :first-of-type {
      flex: 3 1 auto;
    }
    > * {
      flex: 1 1 auto;
    }
    .stack-title {
      flex-wrap: wrap;
    }
    .post-img {
      object-fit: cover;
      border-radius: 8px;
    }
  }

  ${mediaBreakpointDown(
    BREAKPOINTS.lg,
    css`
       {
        padding: 60px 24px;

        .post-div {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    `
  )}

  ${mediaBreakpointDown(
    BREAKPOINTS.md,
    css`
       {
        width: 100%;
        .postDiv {
          flex-direction: column;
        }
      }
    `
  )}
`;

const PostButton = styled(Button)`
  ${Fonts.paragraphSmall};
  padding: 15px 50px;
  border: 1px solid #232526;
  color: #232526;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  width: auto;
  height: 50px;
  color: ${Theme.colors.white};

  :hover {
    opacity: 0.75;
    background-color: transparent;
    border: 1px solid #232526;
  }
`;

type PostListProps = {
  data: PostResponse[];
  locale: string;
};

const PostList: React.FC<PostListProps> = ({ data: initialPost, locale }) => {
  const router = useRouter();
  const { data, isLoading } = useGetPosts(initialPost, locale);

  const dateLocale = swithObjectValues(router.locale ?? "en", {
    en: enGB,
    cs,
  });

  return (
    <StyledPostSection>
      <div className="header">
        <h2>{t`DIGITAL LIBRARY`}</h2>
        <PostButton
          onClick={() => router.push(PUBLIC_ROUTES.digitalLibrary)}
        >{t`SEE ALL POSTS`}</PostButton>
      </div>
      <Loader isLoading={isLoading}>
        {data?.slice(0, 2).map((data) => (
          <div key={data._id} className="post-div">
            <Stack direction="horizontal" gap={4} className="stack-title">
              <Image
                src={data.imageUrl}
                width={242}
                height={141}
                alt={data.title}
                className="post-img"
              />
              <Stack gap={2} className="justify-content-center">
                <h3 className="post-title">{data.title}</h3>
                <p>
                  <span>
                    {format(new Date(data.publishedDate), "do MMM yyyy", {
                      locale: dateLocale,
                    })}{" "}
                  </span>
                </p>
              </Stack>
            </Stack>

            <div
              className="read-more"
              onClick={() =>
                router.push(
                  `${PUBLIC_ROUTES.digitalLibrary}/${data.slug.current}`
                )
              }
            >
              <a href="#">
                {t`Read More`}
                <span>
                  {" "}
                  <FiArrowUpRight />
                </span>
              </a>
            </div>
          </div>
        ))}
      </Loader>
    </StyledPostSection>
  );
};

export default PostList;
