import React from 'react';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../store/slices/userSlice';

import { MenuBody, Wrapper } from './styled';
import { AccountButton } from '../styled/Buttons';

export default function Menu({ active, setActive, email }) {
    const dispatch = useDispatch();

    return (
        <Wrapper active={active}>
            <MenuBody>
                <AccountButton
                    onClick={() => dispatch(removeUser())}
                >Выйти из аккаунта {email}
                </AccountButton>
            </MenuBody>

        </Wrapper>
    )
}
