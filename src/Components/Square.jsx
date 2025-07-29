import React from 'react';

const Square = ({ value, onClick }) => {
  return (

    <div>
    <button className="square"
    style={{ width: '50px', height: '50px', fontSize: '24px', color: 'black', backgroundColor: '#f0f0f0', border: '2px solid #ccc', borderRadius: '5px' }}
    onClick={onClick}>
      {value}
    </button>
    </div>
  );
}
export default Square;