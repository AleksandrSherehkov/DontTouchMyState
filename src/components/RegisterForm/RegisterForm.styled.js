import { Link } from 'react-router-dom';
import { WrapperForm } from 'components/LoginForm/LoginForm.styled';
import styled from 'styled-components';

export const WrapperFormReg = styled(WrapperForm)`
  padding: 60px 62px;
`;

export const LinkStyled = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: ${({ theme }) => theme.spacing(60)};
  min-height: ${({ theme }) => theme.spacing(12.5)};

  text-align: center;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 1.8px;
  text-transform: uppercase;

  color: ${({ theme }) => theme.colors.btnVioletText};
  background: ${({ theme }) => theme.colors.btnWhiteBg};
  border: ${({ theme }) => theme.borders.normal};
  border-color: ${({ theme }) => theme.colors.blue};
  border-radius: ${({ theme }) => theme.radii.button};
  box-shadow: ${({ theme }) => theme.shadows.secondary};
  cursor: pointer;
`;