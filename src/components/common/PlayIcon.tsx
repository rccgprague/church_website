import Theme from "@/src/theme";
import styled from "@emotion/styled";
import { HtmlHTMLAttributes } from "react";
import { Stack } from "react-bootstrap";
import { BsPlayFill } from "react-icons/bs";

const StyledPlayIcon = styled(Stack)`
  background-color: ${Theme.colors.orange};
  border-radius: 50%;
  height: 100%;
  width: 100%;
  max-height: 80px;
  max-width: 80px;
  text-align: center;
  transition: transform 0.5s ease-out;
  z-index: 1;
  display: flex;
  cursor: pointer;
  :hover {
    transition: transform 0.5s ease-out;
    transform: scale(1.2);
  }
`;

interface PlayIconProps extends HtmlHTMLAttributes<HTMLDivElement> {
  onPlay?: () => void;
}

const PlayIcon: React.FC<PlayIconProps> = ({ onPlay, ...props }) => {
  return (
    <StyledPlayIcon
      {...props}
      className="justify-content-center align-item-center align-self-center"
      onClick={onPlay}
    >
      <BsPlayFill size={52} color="#ffffff" className="align-self-center" />
    </StyledPlayIcon>
  );
};

export default PlayIcon;
