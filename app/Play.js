import React from 'react';

const Play = ({ toggleStart, startText, score }) => {
  
  var text = !startText ? 'Start' : 'Pause';

  return (
    <div >
      <button onClick={toggleStart} className="play score">{text}  {score}</button>
    </div>
  )

}

export default Play;