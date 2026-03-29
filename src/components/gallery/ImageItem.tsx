import styled from "@emotion/styled";
import Image, { ImageProps } from "next/image";

const StyledImage = styled(Image)`
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
`;

interface ImageItemProps extends ImageProps {}

const ImageItem: React.FC<ImageItemProps> = ({ ...props }) => {
  return <StyledImage {...props} />;
};

export default ImageItem;
