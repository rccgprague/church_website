import Fonts from "@/src/theme/fonts";
import styled from "@emotion/styled";
import { HTMLAttributes } from "react";

const StyleHeadingTwo = styled.h2`
  ${Fonts.headingTwo};
`;

const StyleHeadingThree = styled.h3`
  ${Fonts.headingThree};
  width: auto;
`;

interface HeadingsProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Headings: React.FC<HeadingsProps> = ({
  as = "h3",
  children,
  ...props
}) => {
  if (as === "h2") {
    return <StyleHeadingTwo {...props}>{children}</StyleHeadingTwo>;
  }
  return <StyleHeadingThree {...props}>{children}</StyleHeadingThree>;
};

export default Headings;
