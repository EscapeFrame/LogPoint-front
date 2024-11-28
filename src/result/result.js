import React from 'react';
import { useLocation } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const { madeClick, madeCircle } = location.state || { madeClick: [], madeCircle: [] };

  return (
    <div className="Result-body">
      <h1>결과</h1>
      <h2>클릭한 위치</h2>
      <ul>
        {madeClick.map((position, index) => (
          <li key={index}>
            클릭 위치 {index + 1}: (X: {position.left.toFixed(2)}, Y: {position.top.toFixed(2)})
          </li>
        ))}
      </ul>
      <h2>생성된 원의 위치</h2>
      <ul>
        {madeCircle.map((position, index) => (
          <li key={index}>
            원 위치 {index + 1}: (X: {position.left.toFixed(2)}, Y: {position.top.toFixed(2)})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Result;
