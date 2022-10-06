import React, { useState } from "react";
import { ref, set, getDatabase } from "firebase/database";
import { useAuth } from '../hooks/use-auth';

import { Button, SendButton } from './styled/Buttons'
import { CounterValue } from "./styled/CounterValue";
import { CounterInner } from "./styled/CounterInner";

export default function Counter(count) {
    const [value, setValue] = useState(0);
    const { id, email } = useAuth();

    // Через пропсы приходит объект, далее код чтобы получить сложение, а не конкатенацию
    const generalCount = value + Number(Object.values(count));

    const handleSubmit = (e) => {
        e.preventDefault();
        const writeUserData = (generalCount, email) => {
            const db = getDatabase();
            set(ref(db, 'users/user' + id), {
                counter: generalCount,
                email: email,
            });
        }
        writeUserData(generalCount, email);
        setValue(0);
    }
    return (
        <>
            <CounterInner>
                <Button disabled={value === 0} onClick={() => setValue(value - 1)}>-</Button>
                <CounterValue> {value} </CounterValue>
                <Button onClick={() => setValue(Number(value) + 1)}>+</Button>
            </CounterInner>
            <form onSubmit={handleSubmit}>
                <SendButton type="submit">Отправить</SendButton>
            </form>
        </>
    );
}