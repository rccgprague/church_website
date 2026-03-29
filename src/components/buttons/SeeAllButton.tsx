import Fonts from "@/src/theme/fonts";
import styled from "@emotion/styled";
import { Button, ButtonProps } from "react-bootstrap";
 
const StyledSeeAllButton = styled(Button)`
    ${Fonts.cardButton};
    padding: 25px 50px;
    border: 1px solid #232526;
    color: #232526;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    width: auto;
    height: 70px;
    :hover {
        opacity: 0.75;
        background-color: transparent;
        border: 1px solid #232526;
        color: #232526;
    }
`;

interface SeeAllButtonProps extends ButtonProps {
    label: string
}

const SeeAllButton:React.FC<SeeAllButtonProps> = ({
    label,
    ...props
}) => {
    return <StyledSeeAllButton {...props} >
        {label}
    </StyledSeeAllButton>
};

export default SeeAllButton;