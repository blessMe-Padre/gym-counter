import React from 'react';
import { Container } from '../components/styled/Container';
import { SignUp } from '../components/SingUp';
import { StyledLink } from '../components/Link';
import { Wrapper } from '../components/styled/PageWrapper';
import { FormWrapper } from '../components/styled/FormWrapper';

const Register = () => {
    return (
        <Container>
            <FormWrapper>
                <Wrapper>
                    <h1>Регистрация</h1>
                    <SignUp />
                    <p>
                        Если у вас уже есть аккаунт <StyledLink to="/login">Вход в аккаунт</StyledLink>
                    </p>
                </Wrapper>
            </FormWrapper>
        </Container>
    )
}

export default Register