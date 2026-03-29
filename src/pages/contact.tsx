import Head from "next/head";
import ContactInfo from "../components/contact/ContactInfo";
import PageHero from "../components/common/PageHero";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { GetServerSideProps } from "next";
import { loadCatalog } from "../utils/lingui";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale!);
  return {
    props: {
      translation,
    },
  };
};

export default function About() {
  /**
   * This hook is needed to subscribe your
   * component for changes if you use t`` macro
   */
  useLingui();
  return (
    <>
      <Head>
        <title>{t`RCCG Prague - Contact us`}</title>
        <meta
          name="description"
          content={t`RCCG Prague, get in touch with us`}
        />
        <meta
          name="keywords"
          content={t`RCCG, Prague, Covenant, Church, contact`}
        />
      </Head>

      <PageHero
        title={t`Get in Touch: Connect with Our Church Community`}
        paragraph1={t`Our church is dedicated to serving our community and spreading God's love, and we believe that open communication is key to fostering strong relationships.`}
        paragraph2={t`That's why we've created this contact page to make it easy for you to connect with us. Whether you have a question, a suggestion, or just want to say hello, we're here to listen.`}
        paragraph3={t`You can reach us through our contact form, email, or phone, and one of our team members will get back to you as soon as possible. We can't wait to hear from you!`}
      />
      <ContactInfo />
    </>
  );
}
