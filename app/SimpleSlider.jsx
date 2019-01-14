import React from 'react';
import RangeSlider from 'reactrangeslider';

// value={ start: 20, end: 80 }
const SimpleSlider = (value, onChange) =>
  <div>
    <RangeSlider
      value={value}
      onChange={onChange}
      min={20}
      max={100}
      step={5}
    />
  </div>;

export default SimpleSlider;
