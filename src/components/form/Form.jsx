import { useState } from 'react';
import { useForm } from "react-hook-form";

import { Button } from '../styled/Buttons';
import { StyledForm, StyledInput, InputWrapper, ErrorMessage, StyledP } from './styled'


const Form = ({ title, handleClick }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: "onBlur"
    });

    // const onSubmit = (e) => {
    //     e.preventDefault();
    // }

    return (
        <>
            <StyledForm onSubmit={handleSubmit()}>
                <InputWrapper>
                    <StyledInput
                        type="email"
                        {...register('emailInput', {
                            required: "Введите адрес почты",
                            pattern: {
                                value: /.+@.+\..+/i,
                                message: 'Email должен быть формата name@gmail.com',
                            },
                        })}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Введите адрес почты"
                    />

                    <ErrorMessage>
                        {errors.emailInput && <StyledP>{errors?.emailInput.message || "Error!!!"}</StyledP>}
                    </ErrorMessage>
                </InputWrapper>
                <InputWrapper>
                    <StyledInput
                        type="password"
                        {...register('passwordInput', {
                            required: "Введите пароль!",
                            minLength: {
                                value: 6,
                                message: "Пароль должен быть больше 6 символов",
                            },
                        })}
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        placeholder="Введите пароль"
                    />
                    <ErrorMessage>
                        {errors.passwordInput && <StyledP>{errors?.passwordInput.message || "Error!!!"}</StyledP>}
                    </ErrorMessage>
                </InputWrapper>
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