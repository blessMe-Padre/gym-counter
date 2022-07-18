import styled from "styled-components";

export const StyledForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

@media(max-width: 767px) {
    width: 100%;
}
`;

export const StyledInput = styled.input`
min-width: 290px;
padding: 0 10px;
margin-bottom: 10px;
height: 36px;
font-size: 16px;

@media(max-width: 767px) {
    width: 100%;
}

&:hover,
&:focus {
    border-color: #ABE1EB;
}
`;

export const InputWrapper = styled.div`
position: relative;
margin-bottom: 30px;
`;

export const ErrorMessage = styled.div`
position: absolute;
top: 40px;
left: 0;
padding-top: 5px;
font-size: 14px;
`;

export const StyledP = styled.p`
margin: 0;
color: red;
`;
