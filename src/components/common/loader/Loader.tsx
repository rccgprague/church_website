import Colors from "@/src/theme/color";
import styled from "@emotion/styled";
import * as React from "react";
import { Spinner } from "react-bootstrap";

const StyledLoader = styled.div`
  padding: 152px 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  .loader-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
    background-color: ${Colors.grey};
    border-radius: 8px;
    margin-right: auto;
    margin-left: auto;
  }
`;

interface ILoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  children?: React.ReactNode;
}

const Loader: React.FunctionComponent<ILoaderProps> = ({
  isLoading,
  children,
  ...props
}) => {
  if (isLoading) {
    return (
      <StyledLoader {...props}>
        <div className="loader-wrapper">
          <Spinner animation="border" role="status" variant="light">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </StyledLoader>
    );
  }
  return <>{children}</>;
};

export default Loader;
