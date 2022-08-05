import React from 'react';
import { TitleWrapper } from './Title.styled';

function Title({ title, subtitle }) {
  return (
    <TitleWrapper>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </TitleWrapper>
  );
}

export default Title;
