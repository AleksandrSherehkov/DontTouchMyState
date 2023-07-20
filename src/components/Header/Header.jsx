import React from 'react';
import { Link } from 'react-router-dom';
import {
  ExitBtn,
  ExitContainer,
  ExitIcon,
  ExitText,
  ExitWrap,
  HeaderContainer,
  NameWrap,
  StickWrap,
  SvgStick,
} from './Header.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsModalLogoutOpen } from 'redux/global/globalSelectors';

import { ModalLogOut } from 'components/ModalLogOut/ModalLogOut';
import { openModalLogout } from 'redux/global/globalSlice';
import { HeaderLogo } from 'components/HeaderLogo/HeaderLogo';

export const Header = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalLogoutOpen);

  return (
    <header>
      <HeaderContainer>
        <Link href="/DontTouchMyState">
          <HeaderLogo />
        </Link>

        <ExitContainer>
          <NameWrap>Name</NameWrap>
          <SvgStick xmlns="http://www.w3.org/2000/svg">
            <path d="M1 0V30" stroke="white" stroke-opacity="0.6" />
          </SvgStick>
          <ExitWrap>
            <ExitBtn type="button" onClick={() => dispatch(openModalLogout())}>
              <ExitIcon />
              <ExitText>Exit</ExitText>
            </ExitBtn>
            {isModalOpen && <ModalLogOut />}
          </ExitWrap>
        </ExitContainer>
      </HeaderContainer>
    </header>
  );
};