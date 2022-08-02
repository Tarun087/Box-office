import React from 'react';

function Title({ title, subtitle }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

export default Title;
