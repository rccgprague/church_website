import Fonts from "@/src/theme/fonts";
import styled from "@emotion/styled";
import { Button, ButtonProps } from "react-bootstrap";
import { AiOutlineRight } from "react-icons/ai";
 
const StyledEventCardButton = styled(Button)`
    ${Fonts.cardButton};
    padding: 14.04px 25px;
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    width: 100%; 
    :hover {
        opacity: 0.75;
        background-color: transparent;
        border: 1px solid rgba(255, 255, 255, 0.07);
    }
`;

interface EventCardButtonProps extends ButtonProps {
    label: string
}

const EventCardButton:React.FC<EventCardButtonProps> = ({
    label,
    ...props
}) => {
    return <StyledEventCardButton {...props} >
        {label} <AiOutlineRight />
    </StyledEventCardButton>
};

export default EventCardButton;