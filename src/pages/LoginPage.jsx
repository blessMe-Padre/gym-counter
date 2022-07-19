import React from 'react';
import { Login } from '../components/Login';

import { StyledLink } from '../components/Link';
import { Container } from '../components/styled/Container';
import { Wrapper } from '../components/styled/PageWrapper';
import { FormWrapper } from '../components/styled/FormWrapper';



const LoginPage = () => {
    return (
        <Container>
            <FormWrapper>
                <Wrapper>
                    <h1>Вход в аккаунт</h1>
                    <Login />
                    <p>
                        Или <StyledLink to="/register">Зарегистрируйтесь</StyledLink>
                    </p>
                </Wrapper>
            </FormWrapper>
        </Container>

    )
}

export default LoginPage