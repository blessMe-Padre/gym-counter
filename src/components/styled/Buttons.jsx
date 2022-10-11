import styled from "styled-components";

export const Button = styled.button`
    min-width: 120px;
    font-size: 18px;
    text-align: left;
    background-color: #9BD3DD;
    color: #fff;
    padding: 10px;
    border: 1px solid #9BD3DD;
    border-radius: 6px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    user-select: none;

    &:hover,
    &:focus {
        background-color: #ABE1EB;
    }

    &:disabled {
        cursor: auto;
        opacity: 0.5;
    }
`;

export const AccountButton = styled(Button)`
    margin-top: 15px;
    cursor: pointer;
    height: 26px;
    padding: 0 10px;
    font-size: 14px;
`;

export const SendButton = styled(Button)`
    width: 100%;
`;

export const TabButton = styled.button`
    padding: 0;
    border: none;
    cursor: pointer;
    font: inherit;
    color: inherit;
    background-color: transparent;
    height: 100px;
    transition: transform 0.3s ease;
    margin: 0 40px;

    &:hover,
    &:focus {
        transform: scale(1.1);
    }

    &:disabled {
        cursor: auto;
        opacity: 0.5;
    }
`;