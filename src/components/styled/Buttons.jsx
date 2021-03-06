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
    margin-top: 40px;
    cursor: pointer;
    height: 26px;
    padding: 0 10px;
    font-size: 14px;
`;

export const SendButton = styled(Button)`
    width: 100%;
`;