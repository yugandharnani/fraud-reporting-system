import React from 'react'

const Child =React.memo(({ onClick }) => {
  console.log("Child component rendered");
  return <button onClick={onClick}>submit</button>;
});

export default Child