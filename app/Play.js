import React from 'react';

const Play = (props) => {
  var text = !props.startText ? 'Start' : 'Pause';
return (
    <div>
      <button onClick={props.toggleStart}>{text}</button>
    </div>
  )

}

export default Play;