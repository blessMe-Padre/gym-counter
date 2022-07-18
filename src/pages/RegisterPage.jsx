import React from 'react';
import { Container } from '../components/styled/Container';
import { SignUp } from '../components/SingUp';
import { StyledLink } from '../components/Link';
import { Wrapper } from '../components/styled/PageWrapper';

const Register = () => {
    return (
        <Container>
            <Wrapper>
                <h1>Регистрация</h1>
                <SignUp />
                <p>
                    Если у вас уже есть аккаунт <StyledLink to="gym-counter/login">Вход в аккаунт</StyledLink>
                </p>
            </Wrapper>
        </Container>
    )
}

export default Register