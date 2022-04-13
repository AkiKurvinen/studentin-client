import React from 'react';

function SvgIcon(props) {
  return (
    <div className='crop'>
      <img
        className={props.cat + ' svg-icon'}
        src={'./img/svg/' + props.icon + '.svg'}
        width='40'
        height='40'
        alt={props.icon}
      ></img>
    </div>
  );
}
export default SvgIcon;
