import styled from "styled-components";
import { lighten } from 'polished';


// const background = {
//   // lighten is the function imported from polished
//   primary: lighten(0.20, '#F5F5F5'),
//   danger: lighten(0.20, '#DD2C00'),
//   success: lighten(0.20, '#7CB342'),
//   info: lighten(0.20, '#BBDEFB')
// };


const Message = styled.div<{ color: string }>`
background-color: ${(props) => lighten(0.48, props.color)}};
border-left: 8px solid ${(props) => props.color};
color: #000;
padding: 1rem;
margin-top: 20px;
margin-bottom: 20px;
`;

export { Message };