import React from 'react';
import ReactDom from 'react-dom';
import Konva from 'konva';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

require('./index.css');

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      score: 0,
      x: 300,
      y: 0,
      radius: 20,
      start: false,
      speed: 40,
      circles: [
        { xPos: Math.floor(Math.random() * 790) + 20, yPos: -100, radius: Math.floor(Math.random() * 20) + 5 },
        { xPos: Math.floor(Math.random() * 790) + 20, yPos: -800, radius: Math.floor(Math.random() * 20) + 5 },
        { xPos: Math.floor(Math.random() * 790) + 20, yPos: -40, radius: Math.floor(Math.random() * 20) + 5 },
        { xPos: Math.floor(Math.random() * 790) + 20, yPos: -90, radius: Math.floor(Math.random() * 20) + 5 },
        { xPos: Math.floor(Math.random() * 790) + 20, yPos: -50, radius: Math.floor(Math.random() * 20) + 5 },
        { xPos: Math.floor(Math.random() * 790) + 20, yPos: -10, radius: Math.floor(Math.random() * 20) + 5 },
        { xPos: Math.floor(Math.random() * 790) + 20, yPos: 0, radius: Math.floor(Math.random() * 20) + 5 },
      ]
    }


    this.delete = this.delete.bind(this);
    this.toggleStart = this.toggleStart.bind(this)
    this.moveCircle = this.moveCircle.bind(this);
    this.resetCircle = this.resetCircle.bind(this);
    this.addCircle = this.addCircle.bind(this);
    this.createCircles = this.createCircles.bind(this);
    this.startGameInterval= 0;
  }

  componentDidMount() {
    setInterval(this.resetCircle, 10000);
    this.createCircles();
  }


  setSpeed(value) {
    this.setState({
      speed: value
    })

    console.log('new speed', this.state.speed)
  }

  createCircles() {
    var interval;
    if (this.state.circles.length < 100) {
      setInterval(this.addCircle, 1000)
    }
  }

  moveCircle() {
    var copy = [...this.state.circles]
    var newCircles = copy.map(circle => {
      //moving 1px per loop cycle
      circle.yPos++;
      return circle
    })

    this.setState({
      circles: newCircles
    })

  }

  resetCircle() {
    var copy = [...this.state.circles]
    var resetMissedBubbles = copy.map(circle => {
      return circle.yPos < 601 ? circle : { xPos: Math.floor(Math.random() * 590) + 20, yPos: Math.floor(Math.random() * -200) + (-10), radius: Math.floor(Math.random() * 20) + 5 }
    })
    this.setState({
      circles: resetMissedBubbles,
    })

  }

  addCircle() {
    this.setState({
      circles: this.state.circles.concat({ xPos: Math.floor(Math.random() * 590) + 20, yPos: Math.floor(Math.random() * -200) + (-10), radius: Math.floor(Math.random() * 20) + 5 })
    })
  }

  toggleStart() {
    this.setState({
      start: !this.state.start
    }, () => {
        //this.state.start ? this.startGameInterval = setInterval(this.moveCircle, 25) : null;
        if (this.state.start) {
          this.startGameInterval = setInterval(this.moveCircle, (1000/this.state.speed))
        } else {
          clearInterval(this.startGameInterval)
        }
    });
  }


  delete(e) {
    e.target.destroy();

    var newScore = this.state.score + 1

    this.setState({
      score: newScore
    })

    this.addCircle();
  }



  render() {
    const { speed } = this.state.speed
    var startText = !this.state.start ? 'Start' : 'Pause'
    return (
      <div>
        score: {this.state.score}
        <div>
          <button onClick={this.toggleStart}>{startText}</button>
        </div>
       
        <div className="slider">Speed
          <input className="speed" type="range" min="10" max="10" value="100" onChange={this.setSpeed.bind(this)} value={this.state.speed}/>
          <div className="speed-label"></div>
        </div> 

        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <Text text="Pop the bubble" fontSize={15} />

            {
              this.state.circles.map((item, i) => {

                var newColor = 'red'
                if (item !== "") {
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
                }

              })}

          </Layer>
        </Stage>
      </div>
    )
  }
}


ReactDom.render(<App />, document.getElementById('app'));

