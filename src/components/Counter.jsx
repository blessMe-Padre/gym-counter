import React, { useState } from "react";
import styled from "styled-components";

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

export default function Counter() {
    const [value, setValue] = useState(1);
    return (
        <>
            <Button disabled={value === 1} onClick={() => setValue(value - 1)}>-</Button>
            <span> {value} </span>
            <Button onClick={() => setValue(Number(value) + 1)}>+</Button>
        </>
    );
}