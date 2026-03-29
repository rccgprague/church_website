import styled from "@emotion/styled";
import PlayIcon from "../common/PlayIcon";
import { Stack } from "react-bootstrap";
import TopOverflow from "../common/TopOverflow";
import { useContext } from "react";
import { ModalContext } from "@/src/context/ModalContext";

const StyledEventVideo = styled(Stack)<{ imageurl: string }>`
  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  z-index: 0;
  width: 100%;
  height: 500px;
  justify-content: center;
`;

const YoutubeIframe = ({ youtubeId }: { youtubeId: string }) => {
  return (
    <iframe
      width="100%"
      height="500px"
      src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
};

const EventVideo = ({
  imageUrl,
  youtubeId,
}: {
  imageUrl: string;
  youtubeId: string;
}) => {
  const { setIsShow, setBody } = useContext(ModalContext);

  const handlePlayIcon = () => {
    setIsShow(true);
    setBody(<YoutubeIframe youtubeId={youtubeId} />);
  };
  return (
    <TopOverflow>
      <StyledEventVideo imageurl={imageUrl}>
        <PlayIcon onPlay={handlePlayIcon} />
      </StyledEventVideo>
    </TopOverflow>
  );
};

export default EventVideo;
