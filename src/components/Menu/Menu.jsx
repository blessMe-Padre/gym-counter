import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../store/slices/userSlice';

import { MenuBody, Wrapper } from './styled';
import { AccountButton } from '../styled/Buttons';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';

export default function Menu({ active, setActive, email }) {
    const dispatch = useDispatch();

    // установка и состояние темы
    const [theme, setTheme] = useState("dark");
    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

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
            </MenuBody>
        </Wrapper>
    )
}
