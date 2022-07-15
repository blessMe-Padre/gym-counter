import { useState } from 'react';
import styled from "styled-components";
import { Button } from './styled/Buttons';


const StyledForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StyledInput = styled.input`
    min-width: 250px;
    padding: 10px;
    margin-bottom: 25px;

    &:hover,
    &:focus {
        border-color: #ABE1EB;
    }
`;


const Form = ({ title, handleClick }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return (
        <StyledForm>
            <StyledInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
            />
            <StyledInput
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="password"
            />
            <Button
                onClick={() => handleClick(email, pass)}
            >
                {title}
            </Button>
        </StyledForm>
    )
}

export { Form }