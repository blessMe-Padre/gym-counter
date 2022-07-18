import styled from "styled-components";

export const StyledForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

export const StyledInput = styled.input`
min-width: 250px;
padding: 0 10px;
margin-bottom: 10px;
height: 36px;
font-size: 16px;

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
`;

export const StyledP = styled.p`
margin: 0;
color: red;
`;
