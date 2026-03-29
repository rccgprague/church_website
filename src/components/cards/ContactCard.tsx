import styled from "@emotion/styled";
import { Button, Card } from "react-bootstrap";
import Theme from "@/src/theme";
import Fonts from "@/src/theme/fonts";

const StyledCard = styled(Card)`
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px;
  width: 100%;
  min-height: 200px;
  gap: 24px;

  .subtitle {
    ${Fonts.footerText};
    color: ${Theme.colors.gray};
    font-size: 14px;
    font-weight: 400;
    width: 100%;
  }

  .title {
    ${Fonts.footerHeading};
    color: ${Theme.colors.gray};
    font-size: 18px;
    font-weight: 600;
  }
`;

const StyledBtn = styled(Button)<{ bgColor?: string; color?: string }>`
  border-radius: 99px;
  padding: 8px 16px;
  border: none;
  text-transform: uppercase;
  background: ${({ bgColor }) => (bgColor ? bgColor : Theme.colors.orange)};
  color: ${({ color }) => (color ? color : Theme.colors.white)};

  :hover {
    background: ${({ bgColor }) => (bgColor ? bgColor : Theme.colors.orange)};
    color: ${({ color }) => (color ? color : Theme.colors.white)};
  }
`;

interface IContactCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function ContactCard(props: IContactCardProps) {
  const { title, subtitle, icon } = props;

  return (
    <StyledCard>
      {icon}
      <div className="title">{title}</div>
      <div className="subtitle">{subtitle}</div>
    </StyledCard>
  );
}
