import "bootstrap/dist/css/bootstrap.min.css";
import "react-circular-progressbar/dist/styles.css";
import type { AppProps } from "next/app";
import AppLayout from "../components/layout/AppLayout";
import GlobalStyles from "@/styles/globalStyles";
import { QueryClient, QueryClientProvider } from "react-query";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { useLinguiInit } from "../hooks/useLungui";
import ModalProviver from "../context/ModalContext";
import { GetServerSideProps } from "next";
import { getFooterContent } from "../sanity/requests/footer";
import { FooterResponse } from "../types/footer";

// Create react query client
const queryClient = new QueryClient();

interface ExtendedAppProps extends AppProps {
  initialFooter: FooterResponse[];
  serverLocale: string;
}

export default function App({
  Component,
  pageProps,
  initialFooter,
  serverLocale,
}: ExtendedAppProps) {
  useLinguiInit(pageProps.translation);
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider i18n={i18n}>
        <ModalProviver>
          <AppLayout initialFooter={initialFooter} locale={serverLocale}>
            <GlobalStyles />
            <Component {...pageProps} />
          </AppLayout>
        </ModalProviver>
      </I18nProvider>
    </QueryClientProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const initialFooter = await getFooterContent({ language: ctx.locale! });
  return {
    props: {
      initialFooter,
      serverLocale: ctx.locale!,
    },
  };
};
