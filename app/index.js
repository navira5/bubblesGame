import React from 'react';
import ReactDom from 'react-dom';
import Konva from 'konva';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import { Slider } from 'reactrangeslider';
import styles from './styles';
import Play from './Play';
require('./index.css');

// const xPositionRanges = {
//   min: 50,
//   max: 1100
// };

// const yPositionRanges = {
//   min: -50,
//   max: -200
// };

// const radiusRanges = {
//   min: 5,
//   max: 50
// }
class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      score: 0,
      start: false,
      speed: 50,

      xPositionRanges: {
        min: 50,
        max: 1100
      },

      yPositionRanges: {
        min: -50,
        max: -200
      },

      radiusRanges: {
        min: 5,
        max: 50
      },

      pointVal: {
        1: 10,
        2: 9,
        3: 8,
        4: 7,
        5: 6,
        6: 5,
        7: 4,
        8: 3,
        9: 2,
        10: 1
      },
      circles: [],
      colors: ['#fa5a5a', '#f0d264', '#82c8a0', '#7fccde', '#6698cb', '#cb99c5']  
    }


    this.delete = this.delete.bind(this);
    this.toggleStart = this.toggleStart.bind(this)
    this.moveCircle = this.moveCircle.bind(this);
    this.resetCircle = this.resetCircle.bind(this);
    this.addCircle = this.addCircle.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  componentDidMount() {

    setInterval(this.resetCircle, 5000);

    this.makeCircleInterval = setInterval(this.addCircle, 1000);
  }

  componentDidUpdate() {

    this.state.circles.length >= 30 ? clearInterval(this.makeCircleInterval) : null;
  }

  toggleStart() {

    this.setState({ start: !this.state.start }, () => {

      this.state.start ? this.startGameInterval = setInterval(this.moveCircle, (1000 / this.state.speed)) : clearInterval(this.startGameInterval)

    });
  }

  onChange(value) {

    this.setState({ speed: value }, () => {

      clearInterval(this.startGameInterval);

      this.state.start ? this.startGameInterval = setInterval(this.moveCircle, (1000 / value)) : null;

    })
  }

  moveCircle() {

    let circlesMoved = [...this.state.circles].map(circle => {
      circle.yPos++;
      return circle
    })

    this.setState({ circles: circlesMoved })
  }

  resetCircle() {

    const { xPositionRanges, yPositionRanges, radiusRanges, colors } = this.state;

    let resetMissedBubbles = [...this.state.circles].map(circle => {

      return circle.yPos < 1000 ? circle :
        {
          xPos: Math.floor(Math.random() * (xPositionRanges.max - xPositionRanges.min + 1)) + xPositionRanges.min,
          yPos: Math.floor(Math.random() * (yPositionRanges.max - yPositionRanges.min + 1)) + yPositionRanges.min,
          radius: Math.floor(Math.random() * (radiusRanges.max - radiusRanges.min + 1)) + radiusRanges.min,
          color: colors[Math.floor(Math.random() * colors.length)]
        }

    })

    this.setState({ circles: resetMissedBubbles })
  }

  addCircle() {

    const { xPositionRanges, yPositionRanges, radiusRanges, colors } = this.state;

    this.setState({
      circles: this.state.circles.concat(
        {
          xPos: Math.floor(Math.random() * (xPositionRanges.max - xPositionRanges.min + 1)) + xPositionRanges.min,
          yPos: Math.floor(Math.random() * (yPositionRanges.max - yPositionRanges.min + 1)) + yPositionRanges.min,
          radius: Math.floor(Math.random() * (radiusRanges.max - radiusRanges.min + 1)) + radiusRanges.min,
          color: colors[Math.floor(Math.random() * colors.length)]
        }
      )
    })
  }



  delete(e) {

    const radius = e.currentTarget.attrs.radius;
    const diameter = (radius * 2).toString()[0]
    const scoreVal = this.state.pointVal[diameter]

    this.state.start ? e.target.destroy() : null;

    this.setState({ score: this.state.score + scoreVal })

    this.addCircle();
  }


  render() {

    const { start, speed, score, circles } = this.state;

    return (

      <div>

        <h2 className='title'>Dot Game</h2>

        <div>  
        {/* Score: {score}  */}
          <div>
            <Play toggleStart={this.toggleStart} startText={start}  score={score}/>
          </div>
        </div>

       
        <div style={styles.root}>
          <div style={styles.sliderWrapper}>
            <Slider
              step={1}
              value={speed}
              min={10}
              max={100}
              onChange={this.onChange}
            />
            </div>
          </div>
   
        {/* Circles */}
        <Stage width={window.innerWidth - 164} height={window.innerHeight} className="stage">
          <Layer>
            {
              circles.map((item, i) => {
                var newColor = 'red'

                return <Circle
                  key={i}
                  x={item.xPos}
                  y={item.yPos}
                  radius={item.radius}
                  fill={item.color}
                  onClick={this.delete}
                  ref={node => {
                    this.rect = node;
                  }}
                />
              })}
          </Layer>
        </Stage>

      </div>
    )
  }
}


ReactDom.render(<App />, document.getElementById('app'));