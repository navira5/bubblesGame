import React from 'react';
import ReactDom from 'react-dom';
import Konva from 'konva';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import { Slider } from 'reactrangeslider';
import styles from './styles';
import Play from './Play';
require('./index.css');

const xPositionRanges = {
    min: 50,
    max: 1100
};

const yPositionRanges = {
    min: -50,
    max: -200
};

const radiusRanges = {
  min: 5,
  max: 50
}


class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      score: 0,
      radius: null,
      start: false,
      speed: 50,
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
      circles: [
        { xPos: Math.floor(Math.random() * (xPositionRanges.max - xPositionRanges.min + 1)) + xPositionRanges.min, yPos: -200, radius: Math.floor(Math.random() * (radiusRanges.max - radiusRanges.min + 1)) + radiusRanges.min},
        { xPos: Math.floor(Math.random() * (xPositionRanges.max - xPositionRanges.min + 1)) + xPositionRanges.min, yPos: -50, radius: Math.floor(Math.random() * (radiusRanges.max - radiusRanges.min + 1)) + radiusRanges.min },
        { xPos: Math.floor(Math.random() * (xPositionRanges.max - xPositionRanges.min + 1)) + xPositionRanges.min, yPos: -60, radius: Math.floor(Math.random() * (radiusRanges.max - radiusRanges.min + 1)) + radiusRanges.min },
        { xPos: Math.floor(Math.random() * (xPositionRanges.max - xPositionRanges.min + 1)) + xPositionRanges.min, yPos: -90, radius: Math.floor(Math.random() * (radiusRanges.max - radiusRanges.min + 1)) + radiusRanges.min },
        { xPos: Math.floor(Math.random() * (xPositionRanges.max - xPositionRanges.min + 1)) + xPositionRanges.min, yPos: -200, radius: Math.floor(Math.random() * (radiusRanges.max - radiusRanges.min + 1)) + radiusRanges.min },
        { xPos: Math.floor(Math.random() * (xPositionRanges.max - xPositionRanges.min + 1)) + xPositionRanges.min, yPos: -150, radius: Math.floor(Math.random() * (radiusRanges.max - radiusRanges.min + 1)) + radiusRanges.min },
      ]
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

    this.makeCircleInterval  = setInterval(this.addCircle, 2000);
    //this.makeCircleInterval = setInterval(this.makeCircle, 2000);

  }

  componentDidUpdate() {

    this.state.circles.length >= 30 ? clearInterval(this.makeCircleInterval) : null;
    //this.state.circles.length >= 30 ? clearInterval(this.makeCircleInterval) : null;

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
    //this.setState({ divCircles: circlesMoved })
  }

  resetCircle() {
  
    let resetMissedBubbles = [...this.state.circles].map(circle => {

      return circle.yPos < 1000 ? circle : 
        {
          xPos: Math.floor(Math.random() * (xPositionRanges.max - xPositionRanges.min + 1)) + xPositionRanges.min, 
          yPos: Math.floor(Math.random() * (yPositionRanges.max - yPositionRanges.min + 1)) + yPositionRanges.min, 
          radius: Math.floor(Math.random() * (radiusRanges.max - radiusRanges.min + 1)) + radiusRanges.min
        }

    })

    this.setState({ circles: resetMissedBubbles })
  }

  addCircle() {

    this.setState({
      circles: this.state.circles.concat(
        {
          xPos: Math.floor(Math.random() * (xPositionRanges.max - xPositionRanges.min + 1)) + xPositionRanges.min, 
          yPos: Math.floor(Math.random() * (yPositionRanges.max - yPositionRanges.min + 1)) + yPositionRanges.min, 
          radius: Math.floor(Math.random() * (radiusRanges.max - radiusRanges.min + 1)) + radiusRanges.min
        }
        )
    })
  }



  delete(e) {

    //Calculate score based on radius size
    const radius = e.currentTarget.attrs.radius;
    const diameter = (radius * 2).toString()[0]
    const scoreVal = this.state.pointVal[diameter]

    this.state.start ? e.target.destroy() : null;
  
    this.setState({ score: this.state.score + scoreVal  })

    this.addCircle();

  }


  render() {

    const { start, speed, score, circles } = this.state;

    return (
      <div>

        { /* Score tracker and game start */ }
        <div>
          Score: {score}
          <div>
            <Play toggleStart={this.toggleStart} startText={start} />
          </div>

        { /* Speed control slider*/ }
        <div style={styles.root}>
          <div style={styles.sliderWrapper}>
            <Slider
              step={5}
              value={speed}
              min={10}
              max={100}
              onChange={this.onChange}
            />
          </div>
        </div>

        {/* Circles */}
          <Stage width={window.innerWidth-164} height={window.innerHeight} className="stage">
            <Layer>
              {
                circles.map((item, i) => {
                  var newColor = 'red'
                  
                    return <Circle
                      key={i}
                      x={item.xPos}
                      y={item.yPos}
                      radius={item.radius}
                      fill={newColor}
                      onClick={this.delete}
                      ref={node => {
                        this.rect = node;
                      }}
                    />
                })}
            </Layer>
          </Stage>
        </div>
      </div>
    )
  }
}


ReactDom.render(<App />, document.getElementById('app'));



