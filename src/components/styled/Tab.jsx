import styled from "styled-components";

// export const Tab = styled.div`
//     display: ${(p) => (p.active ? "block" : "none")};
// `;

export const Tab = styled.div`
    position: ${(p) => (p.active ? "absolute" : "static")};
    width: ${(p) => (p.active ? "1px" : "100%")};
    height: ${(p) => (p.active ? "1px" : "100%")};
    overflow: ${(p) => (p.active ? "hidden" : "visible")};
    margin-bottom: 30px;
`;

export const TabButtonsInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
`;

export const TabWrapper = styled.div`
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const TabTitle = styled.p`
    text-align: left;
    font-size: 24px;
    margin: 10px 0 0 0;
`;
