import React, { useState } from "react";
import styled from "styled-components";
import { ref, set, getDatabase } from "firebase/database";
import { useAuth } from '../hooks/use-auth';

const Button = styled.button`
    min-width: 100px;
    font-size: 18px;
    text-align: left;
    background-color: orange;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 4px;
`;

export default function Counter(count) {
    const [value, setValue] = useState(0);
    const { id, email } = useAuth();

    // Через пропсы приходит объект, далее код чтобы получить сложение, а не конкатенацию
    const generalCount = value + Number(Object.values(count));

    const handleSubmit = (e) => {
        e.preventDefault();
        const writeUserData = (genegalCount, email) => {
            const db = getDatabase();
            set(ref(db, 'users/user' + id), {
                counter: genegalCount,
                email: email,
            });
        }

        writeUserData(generalCount, email)
    }
    return (
        <>
            <Button disabled={value === 0} onClick={() => setValue(value - 1)}>-</Button>
            <span> {value} </span>
            <Button onClick={() => setValue(Number(value) + 1)}>+</Button>
            <form onSubmit={handleSubmit}>
                <button type="submit">Отправить</button>
            </form>
        </>
    );
}