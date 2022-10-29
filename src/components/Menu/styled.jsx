import styled, { keyframes } from "styled-components";

const breatheAnimation = keyframes`
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
`;

export const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    background: linear-gradient(50deg, #4b79cf, #4bc5cf);
    background-size: 300% 300%;
    top: 0;
    left: 0;
    transition: transform 0.3s ease-in;
    transform: translate(${(p) => (p.active ? "0" : "100%")}, 0);
    animation: ${breatheAnimation} 10s ease infinite;
`;

export const MenuBody = styled.div`
    padding: 70px 15px;
    color: #2e3346;

`;