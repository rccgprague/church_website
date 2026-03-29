import React, { useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import SimpleReactLightbox from "simple-react-lightbox";
import Head from "next/head";
import { useRouter } from "next/router";
import Loader from "../common/loader/Loader";
import { FooterResponse } from "@/src/types/footer";

interface AppLayoutProp {
  children: React.ReactNode;
  initialFooter: FooterResponse[];
  locale: string;
}

const AppLayout: React.FC<AppLayoutProp> = ({
  children,
  initialFooter,
  locale,
}) => {
  const { events } = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    events.on("routeChangeStart", () => setIsLoading(true));
    events.on("routeChangeComplete", () => setIsLoading(false));
    events.on("routeChangeError", () => setIsLoading(false));
    return () => {
      events.off("routeChangeStart", () => setIsLoading(true));
      events.off("routeChangeComplete", () => setIsLoading(false));
      events.off("routeChangeError", () => setIsLoading(false));
    };
  }, [events]);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SimpleReactLightbox>
        <AppHeader />
        <Loader isLoading={isLoading}>{children}</Loader>
        <AppFooter initialFooter={initialFooter} locale={locale} />
      </SimpleReactLightbox>
    </>
  );
};

export default AppLayout;
