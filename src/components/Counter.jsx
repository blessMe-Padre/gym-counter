import React, { useState } from "react";
import { ref, set, getDatabase } from "firebase/database";
import { useAuth } from '../hooks/use-auth';

import { Button } from './styled/Buttons'
import { CounterValue } from "./styled/CounterValue";

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
        writeUserData(generalCount, email);
        let value = setValue(0);
    }
    return (
        <>
            <Button disabled={value === 0} onClick={() => setValue(value - 1)}>-</Button>
            <CounterValue> {value} </CounterValue>
            <Button onClick={() => setValue(Number(value) + 1)}>+</Button>
            <form onSubmit={handleSubmit}>
                <Button type="submit">Отправить</Button>
            </form>
        </>
    );
}