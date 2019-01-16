import React from 'react';

const Play = ({ toggleStart, startText }) => {
  var text = !startText ? 'Start' : 'Pause';

  return (
    <div>
      <button onClick={toggleStart}>{text}</button>
    </div>
  )

}

export default Play;