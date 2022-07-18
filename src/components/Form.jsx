import { useState } from 'react';
import styled from "styled-components";
import { Button } from './styled/Buttons';


const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const StyledInput = styled.input`
    min-width: 250px;
    padding: 0 10px;
    margin-bottom: 25px;
    height: 36px;
    font-size: 16px;

    &:hover,
    &:focus {
        border-color: #ABE1EB;
    }
`;


const Form = ({ title, handleClick }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const formSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <StyledForm onSubmit={formSubmit}>
                <StyledInput
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Введите адрес почты"
                />
                <StyledInput
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="Введите пароль"
                />
                <Button
                    type='submit'
                    onClick={() => handleClick(email, pass)}
                >
                    {title}
                </Button>
            </StyledForm>
        </>
    )
}

export { Form }