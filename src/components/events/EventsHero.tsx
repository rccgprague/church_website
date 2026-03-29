import { t } from "@lingui/macro";
import PageHero from "../common/PageHero";

export default function EventsHero() {
  return (
    <PageHero
      title={t`Covenant parish prague Events`}
      paragraph1={t`Celebrate with Us: Upcoming Events at Covenant parish prague.`}
      paragraph2={t`Introduction: Welcome to our event page! We are excited to share with you the upcoming events that we have planned for you and your family.`}
      paragraph3={t`Community Gatherings: Meet new friends and connect with old ones at our community gatherings.`}
    />
  );
}
