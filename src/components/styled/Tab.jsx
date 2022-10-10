import styled from "styled-components";

// export const Tab = styled.div`
//     display: ${(p) => (p.active ? "block" : "none")};
// `;

export const Tab = styled.div`
    opacity: ${(p) => (p.active ? "1" : "0")};
    height: ${(p) => (p.active ? "100%" : "2px")};
`;

export const TabButtonsInner = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
`;
