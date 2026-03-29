import styled from "@emotion/styled";
import PlayIcon from "../common/PlayIcon";
import { Stack } from "react-bootstrap";
import TopOverflow from "../common/TopOverflow";
import { useContext } from "react";
import { ModalContext } from "@/src/context/ModalContext";

const StyledAboutVideo = styled(Stack)`
  background-image: url(/images/who-we-are-bg.jpeg);
  background-repeat: no-repeat;
  border-radius: 10px;
  z-index: 0;
  width: 100%;
  height: 100vh;
  justify-content: center;
`;

const YoutubeIframe = () => {
  return (
    <iframe
      width="100%"
      height="500px"
      src="https://www.youtube.com/embed/4bX8DLBdi8U"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
};

const AboutVideo = () => {
  const { setIsShow, setBody } = useContext(ModalContext);

  const handlePlayIcon = () => {
    setIsShow(true);
    setBody(<YoutubeIframe />);
  };
  return (
    <TopOverflow>
      <StyledAboutVideo>
        <PlayIcon onPlay={handlePlayIcon} />
      </StyledAboutVideo>
    </TopOverflow>
  );
};

export default AboutVideo;
