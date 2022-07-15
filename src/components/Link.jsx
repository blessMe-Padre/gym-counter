import { Link } from 'react-router-dom';

import styled from "styled-components";

export const StyledLink = styled(Link)`
    color: #9BD3DD;
    transition: all 0.3s ease;
    text-decoration: none;
    margin-left: 10px;

    &:hover,
    &:focus {
        color: #ABE1EB;
    }
`;
