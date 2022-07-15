import React from 'react';
import { Login } from '../components/Login';

import { StyledLink } from '../components/Link';
import { Container } from '../components/styled/Container';
import { Wrapper } from '../components/styled/PageWrapper';



const LoginPage = () => {
    return (
        <Container>
            <Wrapper>
                <h1>Вход в аккаунт</h1>
                <Login />
                <p>
                    Или <StyledLink to="/register">Зарегистрируйтесь</StyledLink>
                </p>
            </Wrapper>
        </Container>

    )
}

export default LoginPage