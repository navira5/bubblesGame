import React from 'react';
import ReactDom from 'react-dom';
import Konva from 'konva';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import Portal from './Portal';
import { Slider } from 'reactrangeslider';
import styles from './styles';
import Play from './Play';
// import Bubble from './Bubble';
require('./index.css');

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      score: 0,
      x: {
        min: 10,
        max: 790
      },
      y: {
        min: -20,
        max: 610
      },
      radius: null,
      xPos: Math.floor(Math.random() * (790 - 10 + 1)) + 10,
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
        { xPos: Math.floor(Math.random() * (1200 -50 + 1)) + 50, yPos: -200, radius: Math.floor(Math.random() * (50 - 5 + 1)) + 5},
        { xPos: Math.floor(Math.random() * (1200 -50 + 1)) + 50, yPos: -50, radius: Math.floor(Math.random() * (50 - 5 + 1)) + 5},
        { xPos: Math.floor(Math.random() * (1200 -50 + 1)) + 50, yPos: -60, radius: Math.floor(Math.random() * (50 - 5 + 1)) + 5},
        { xPos: Math.floor(Math.random() * (1200 -50 + 1)) + 50, yPos: -90, radius: Math.floor(Math.random() * (50 - 5 + 1)) + 5},
        { xPos: Math.floor(Math.random() * (1200 -50 + 1)) + 50, yPos: -200, radius: Math.floor(Math.random() * (50 - 5 + 1)) + 5},
        { xPos: Math.floor(Math.random() * (1200 -50 + 1)) + 50, yPos: -150, radius: Math.floor(Math.random() * (50 - 5 + 1)) + 5},
      ],
      divCircles: [{ yPos: 0 }, { yPos: 0 }, { yPos: 0 }, { yPos: 0 }, { yPos: 0 }]
    }


    this.delete = this.delete.bind(this);
    this.toggleStart = this.toggleStart.bind(this)
    this.moveCircle = this.moveCircle.bind(this);
    this.resetCircle = this.resetCircle.bind(this);
    this.addCircle = this.addCircle.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.removeCircle = this.removeCircle.bind(this);
    // this.popCircle = this.popCircle.bind(this);
    // this.makeCircle = this.makeCircle.bind(this);
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
        { xPos: Math.floor(Math.random() * (1200 - 50 + 1)) + 50, 
          yPos: Math.floor(Math.random() * -200) + (-10), 
          radius: Math.floor(Math.random() * (50 - 5 + 1)) + 5 
        }
    })
    this.setState({ circles: resetMissedBubbles })
  }

  addCircle() {
    this.setState({
      circles: this.state.circles.concat(
        { xPos: Math.floor(Math.random() * (1200 - 50 + 1)) + 50, 
          yPos: Math.floor(Math.random() * -200) + (-10), 
          radius: Math.floor(Math.random() * (50 - 5 + 1)) + 5 
        }
        )
      // circles: this.state.circles.concat({ xPos: Math.floor(Math.random() * 790) + 55, yPos: Math.floor(Math.random() * -200) + (-10), radius: Math.floor(Math.random() * 50) + 5 })
    })
  }

  delete(e) {

    const radius = e.currentTarget.attrs.radius;
    const diameter = (radius * 2).toString()[0]
    const scoreVal = this.state.pointVal[diameter]

    this.state.start ? e.target.destroy() : null;
  
    this.setState({ score: this.state.score + scoreVal  })

    this.addCircle();

  }


  render() {
    const { start, speed, score, circles } = this.state;
     console.log(this.state.circles)

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



