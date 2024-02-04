import styled, { keyframes } from "styled-components";

const kfs = keyframes`
  0%   { background-position: -150% 0, -150% 0; }
  66%  { background-position: 250% 0, -150% 0; }
  100% { background-position: 250% 0, 250% 0; }
`;

const Loader = styled.div`
  height: 4px;
  width: 100%;
  --c: no-repeat linear-gradient(#bf00dd 0 0);
  background: var(--c), var(--c), #d7b8fc;
  background-size: 60% 100%;
  animation: ${kfs} 3s infinite;
`;

export default Loader;
