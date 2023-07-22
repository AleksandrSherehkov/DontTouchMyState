import styled, { css, keyframes } from 'styled-components';

const passwordStrengthAnimation = keyframes`
  from {
    width: 0%;
    background-color: transparent;
  }
  to {
    width:${props => props.width};
    background-color: ${props => props.color};
  }
`;

export const PasswordStrengthIndicator = styled.div`
  width: 100%;
  height: 3px;
  margin-top: 5px;
  background-color: transparent;
  border-radius: 5px;
  animation: ${passwordStrengthAnimation} 0.5s ease;
  width: ${props => props.width};
  background-color: ${props => props.color};
  ${props => css`
    background-color: ${props.color};
  `}
`;

export const PasswordStrengthText = styled.p`
  margin-top: 5px;
  color: ${props => props.color};
  font-size: 14px;
  font-weight: bold;
`;