import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { loadCatalog } from "@/src/utils/lingui";
import { GetServerSideProps } from "next";
import { useLingui } from "@lingui/react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale!);
  return {
    props: {
      translation,
    },
  };
};

export default function AdminPage() {
  /**
   * This hook is needed to subscribe your
   * component for changes if you use t`` macro
   */
  useLingui();
  return <NextStudio config={config} />;
}
