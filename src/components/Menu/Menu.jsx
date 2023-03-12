import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../store/slices/userSlice';

import { ref, set, getDatabase } from "firebase/database";

import { MenuBody, Wrapper } from './styled';
import { AccountButton } from '../styled/Buttons';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';

export default function Menu({ active, setTarget, email, id, target }) {
    const dispatch = useDispatch();

    // установка и состояние темы
    const [theme, setTheme] = useState("dark");
    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    // обработчик кнопки смены цели
    const changeTarget = (e) => {
        e.preventDefault();
        let inputValue = prompt('Введите новое число повторений к которому нужно стремиться');

        if (inputValue.replace(/\d/g, '').length) {
            setTarget(inputValue = 2500);
            alert('вы ввели не только цифры, поставим цель на 2500 повторений');
        } else {
            setTarget(inputValue);
        }

        const writeUserDataPullUp = (target) => {
            const db = getDatabase();
            set(ref(db, 'users/user' + id + '/target'), {
                target: target,
            });

        }
        writeUserDataPullUp(inputValue);

    }

    useEffect(() => {
        document.body.setAttribute('data-theme', theme)
    }, [theme])

    return (
        <Wrapper active={active}>
            <MenuBody>
                <AccountButton
                    onClick={() => dispatch(removeUser())}
                >Выйти из аккаунта {email}
                </AccountButton>
                <AccountButton>
                    <ThemeSwitcher onClick={toggleTheme}>
                        Включить {theme === 'dark' ? 'Светлую тему' : 'Темную тему'}
                    </ThemeSwitcher>
                </AccountButton>
                <AccountButton onClick={changeTarget}>
                    Назначить новую цель
                </AccountButton>
            </MenuBody>
        </Wrapper>
    )
}
