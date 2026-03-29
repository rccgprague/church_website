import { t } from "@lingui/macro";
import PageHero from "../common/PageHero";

export default function AboutHero() {
  return (
    <PageHero
      isImage
      title={t`About Covenant parish prague`}
      paragraph1={t`The Covenant Parish is the headquarter Church of The Redeemed Christian Church of God (RCCG) in Prague, Czech Republic.`}
      paragraph2={t`According to The Lord's promise in Matthew 16:18, the Church is currently under the leadership of the Holy Spirit  with Dr. Augustine Otekhile as the undershepherd.`}
      paragraph3={t`It is my sincere desire to have you engage with us on this platform to experience the love of God in Christ Jesus and true fellowship. God bless you richly.`}
    />
  );
}
