import React, { useState } from "react";
import { ref, set, getDatabase } from "firebase/database";
import { useAuth } from '../hooks/use-auth';

import { Button, SendButton } from './styled/Buttons'
import { CounterValue } from "./styled/CounterValue";
import { CounterInner } from "./styled/CounterInner";
import { CounterForm } from "./styled/CounterForm";

export default function Counter({ count, countMonth, currentMonth }) {
    const [value, setValue] = useState(0);
    const { id, email } = useAuth();

    const generalCount = value + count;
    const generalCountMonth = value + countMonth;

    const handleSubmit = (e) => {
        e.preventDefault();
        const writeUserDataPullUp = (generalCount, generalCountMonth, email) => {
            const db = getDatabase();
            set(ref(db, 'users/user' + id + '/general'), {
                counter: generalCount,
                email: email,
            });

            set(ref(db, 'users/user' + id + '/' + currentMonth), {
                counter: generalCountMonth,
            });
        }
        writeUserDataPullUp(generalCount, generalCountMonth, email);
        setValue(0);

    }


    return (
        <>
            <CounterInner>
                <Button disabled={value === 0} onClick={() => setValue(value - 1)}>-</Button>
                <CounterValue> {value} </CounterValue>
                <Button onClick={() => setValue(Number(value) + 1)}>+</Button>
            </CounterInner>
            <CounterForm onSubmit={handleSubmit}>
                <SendButton disabled={value === 0} type="submit">Отправить</SendButton>
            </CounterForm>
        </>
    );
}