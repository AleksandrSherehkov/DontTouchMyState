import { IoExitOutline } from 'react-icons/io5';
import styled from 'styled-components';

export const HeaderContainer = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 16px;
  align-items: center;
  background: linear-gradient(276deg, #2e1746 3.19%, #2e225f 100%);

  @media screen and (max-width: 500px) {
    padding: 12px 20px;
  }
`;

export const ExitContainer = styled.div`
  display: flex;
  align-items: center; /* Align items vertically in the center */
  color: rgba(255, 255, 255, 0.6);
`;

export const ExitBtn = styled.button`
  display: flex; /* Додаємо flex для дочірніх елементів */
  align-items: center;
  background: transparent;
  border: none;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
`;

export const ExitText = styled.span`
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

export const NameWrap = styled.span`
  margin-right: 12px;
  @media screen and (max-width: 500px) {
    margin-right: 8px;
  }
`;

export const SvgStick = styled.svg`
  width: 2px;
  height: 30px;
  fill: none;
  margin-right: 12px;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

export const ExitIcon = styled(IoExitOutline)`
  width: 30px;
  height: 30px;
  margin-right: 8px;
  @media screen and (max-width: 500px) {
    margin-right: 0;
  }
`;

export const ExitWrap = styled.div`
  display: flex;
  align-items: center;
`;