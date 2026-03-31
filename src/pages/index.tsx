import Head from "next/head";
import { GetServerSideProps } from "next";
import { Container } from "react-bootstrap";
import HomeHero from "../components/hero/HomeHero";
import HomeTeam from "../components/HomeTeam";
import HomeIntro from "../components/HomeIntro";
import UpcomingEvents from "../components/UpcomingEvents";
import HomeSlider from "../components/HomeSlider";
import PostList from "../components/PostList";
import { loadCatalog } from "../utils/lingui";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import Countdown from "../components/Countdown";
import { useGetHomeContent } from "../hooks/useHome";
import Loader from "../components/common/loader/Loader";
import { getHomePage } from "../sanity/requests/home";
import { HomeResponse } from "../types/home";
import { getEvents } from "../sanity/requests/event";
import { getTeam } from "../sanity/requests/team";
import { getTestimonials } from "../sanity/requests/testimonial";
import { getPosts } from "../sanity/requests/post";
import { EventsResponse } from "../types/events";
import { TeamResponse } from "../types/team";
import { TestimonialResponse } from "../types/testimonial";
import { PostResponse } from "../types/post";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale!);
  const initialHome = await getHomePage({ language: ctx.locale! });
  const initialEvents = await getEvents({ language: ctx.locale! });
  const initialTeam = await getTeam({ language: ctx.locale! });
  const initialTestimonials = await getTestimonials();
  const initialPosts = await getPosts({ language: ctx.locale! });
  return {
    props: {
      translation,
      initialHome,
      initialEvents,
      initialTeam,
      initialTestimonials,
      initialPosts,
      serverLocale: ctx.locale!,
    },
  };
};

export default function Home({
  initialHome,
  initialEvents,
  initialTeam,
  initialTestimonials,
  initialPosts,
  serverLocale,
}: {
  initialHome: HomeResponse[];
  initialEvents: EventsResponse[];
  initialTeam: TeamResponse[];
  initialTestimonials: TestimonialResponse[];
  initialPosts: PostResponse[];
  serverLocale: string;
}) {
  /**
   * This hook is needed to subscribe your
   * component for changes if you use t`` macro
   */
  useLingui();
  const { data, isLoading } = useGetHomeContent(initialHome, serverLocale);
  const {
    bannerTitle,
    bannerSubTitle,
    bannerImageUrl,
    bannerHotspot,
    bannerSlides,
    liveStartDateTime,
    liveYoutubeUrl,
    themeImageUrl,
    themeLogoUrl,
    themeMessage,
    themeTitle,
    themeVerse,
    whoWeAreTitle,
    whoWeAreMessage,
    whoWeAreImageUrl,
    whoWeAreYoutubeUrl,
  } = data?.at(0) ?? {};

  const heroSlides =
    bannerSlides && bannerSlides.length > 0
      ? bannerSlides
      : [{ imageUrl: bannerImageUrl ?? "/images/hero-bg.jpeg", hotspot: bannerHotspot }];

  return (
    <>
      <Head>
        <title>{t`RCCG Prague - Covenant Parish`}</title>
        <meta
          name="description"
          content={t`The RCCG Prague Covenant Parish is the headquarter Church of Redeemed Christian Church of God Prague, Czech Republic.`}
        />
        <meta
          name="keywords"
          content={`RCCG, Prague, Church, Covenant, Parish`}
        />
      </Head>
      <Loader isLoading={isLoading}>
        <Container fluid className="px-0">
          <HomeHero
            title={bannerTitle ?? t`The Covenant Place`}
            subTitle={bannerSubTitle ?? t`Welcome to RCCG Prague`}
            slides={heroSlides}
          />
          <Countdown
            theme={{
              imageUrl: themeImageUrl ?? "",
              logoUrl: themeLogoUrl ?? "",
              message: themeMessage ?? "",
              title: themeTitle ?? "",
              verse: themeVerse ?? "",
            }}
          />
          <UpcomingEvents data={initialEvents} locale={serverLocale} />
          <HomeIntro
            title={whoWeAreTitle ?? ""}
            message={whoWeAreMessage ?? ""}
            youtubeLiveId={whoWeAreYoutubeUrl ?? ""}
            bgImage={whoWeAreImageUrl ?? ""}
          />
          <HomeTeam data={initialTeam} locale={serverLocale} />
          <HomeSlider data={initialTestimonials} />
          <PostList data={initialPosts} locale={serverLocale} />
        </Container>
      </Loader>
    </>
  );
}
