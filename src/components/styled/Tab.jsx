import styled from "styled-components";

// export const Tab = styled.div`
//     display: ${(p) => (p.active ? "block" : "none")};
// `;

export const Tab = styled.div`
    position: ${(p) => (p.active ? "absolute" : "static")};
    width: ${(p) => (p.active ? "1px" : "100%")};
    height: ${(p) => (p.active ? "1px" : "670px")};
    overflow: ${(p) => (p.active ? "hidden" : "visible")};
`;

export const TabButtonsInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
