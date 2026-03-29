import Theme from "@/src/theme";
import styled from "@emotion/styled";
import { BREAKPOINTS, mediaBreakpointDown } from "@/src/theme/breakpoints";
import { css } from "styled-components";
import { Card } from "react-bootstrap";
import Image from "next/image";
import Fonts from "@/src/theme/fonts";
import { useRouter } from "next/router";
import { PostResponse } from "@/src/types/post";
import { format } from "date-fns";
import { swithObjectValues } from "@/src/utils/data";
import { enGB, cs } from "date-fns/locale";

const StyledCard = styled(Card)`
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  justify-content: space-between;
  width: 100%;
  min-height: 500px;
  gap: 52px;
  cursor: pointer;

  .title {
    ${Fonts.headingTitle}
    color: ${Theme.colors.black};
    text-decoration: underline;
    font-size: 22px;
  }

  .subtitle {
    ${Fonts.paragraphNormal};
  }

  .date {
    ${Fonts.paragraphSmall};
    text-transform: capitalize;
  }

  ${mediaBreakpointDown(
    BREAKPOINTS.lg,
    css`
       {
        width: 100%;
      }
    `
  )}
`;

const StyledImage = styled(Image)`
  border-radius: 8px;
  object-fit: contain;
  width: 100%;
`;

interface IBlogCardProps {
  image: string;
  date: string;
  title: string;
  subtitle: PostResponse["body"];
  slug: string;
}

export default function BlogCard(props: IBlogCardProps) {
  const router = useRouter();
  const { image, title, subtitle, date, slug } = props;

  const handleCardClick = () => {
    router.push(`/blog/${slug}`);
  };

  const dateLocale = swithObjectValues(router.locale ?? "en", {
    en: enGB,
    cs,
  });

  return (
    <StyledCard onClick={handleCardClick}>
      <div>
        <StyledImage src={image} alt={title} width={352} height={240} />
        <div className="title mt-4 mb-2">{title}</div>

        <div className="subtitle">
          {subtitle[0].children[0].text.substring(0, 50)}...
        </div>
      </div>

      <div className="date">
        {format(new Date(date), "do MMM yyyy", {
          locale: dateLocale,
        })}
      </div>
    </StyledCard>
  );
}
