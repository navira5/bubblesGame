import React from 'react';

const Bubble= ({ circleSize, topPos, leftPos, color, removeCircle, index, popCircle, point }) => {
  const circleStyle = {
    margin: '20px',
    width: circleSize + 'px',
    height: circleSize + 'px',
    backgroundColor: color,
    display: 'inline-block',
    borderRadius: '50%',
    top: topPos.toString() + 'px',
    left: leftPos + 'px',
    position: 'absolute'
  }
 //console.log('top position', topPos)
  return (
    <div 
      style={circleStyle}
      onClick={popCircle(index, point)}
      onAnimationEnd = { () => {
        removeCircle(index)
      }}
      > Hello </div>
  
  )
}

export default Bubble;