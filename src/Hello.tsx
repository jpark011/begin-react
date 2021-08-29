import React from 'react';

type HelloProps = {
  name: string;
  isSpecial: boolean;
};

function Hello({ name, isSpecial }: HelloProps) {
  return (
    <div>
      {isSpecial && <b>*</b>} 안녕하세요 {name}
    </div>
  );
}

Hello.defaultProps = {
  name: '이름없음',
  isSpecial: false,
};

export default Hello;
