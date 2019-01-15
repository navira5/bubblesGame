import React from 'react';
import ReactDom from 'react-dom';
import Konva from 'konva';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import Slider from '@material-ui/lab/Slider';
import { Slider } from 'reactrangeslider';
import styles from './styles';
import Play from './Play';
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
      speed: 10,

      circles: [
        { xPos: Math.floor(Math.random() * window.innerWidth -100) + 100, radius: Math.floor(Math.random() * 50) + 5 },
        { xPos: Math.floor(Math.random() * window.innerWidth -100) + 100, yPos: -800, radius: Math.floor(Math.random() * 50) + 5 },
        { xPos: Math.floor(Math.random() * window.innerWidth -100) + 100, yPos: -40, radius: Math.floor(Math.random() * 50) + 5 },
        { xPos: Math.floor(Math.random() * window.innerWidth -100) + 100, yPos: -90, radius: Math.floor(Math.random() * 50) + 5 },
        { xPos: Math.floor(Math.random() * window.innerWidth -100) + 100, yPos: -100, radius: Math.floor(Math.random() * 50) + 5 },
        { xPos: Math.floor(Math.random() * window.innerWidth -100) + 100, yPos: -10, radius: Math.floor(Math.random() * 50) + 5 },
        // { xPos: Math.floor(Math.random() * 790) + 55, yPos: 0, radius: Math.floor(Math.random() * 50) + 5 },
        // { xPos: Math.floor(Math.random() * 790) + 55, yPos: -100, radius: Math.floor(Math.random() * 50) + 5 },
        // { xPos: Math.floor(Math.random() * 790) + 55, yPos: -800, radius: Math.floor(Math.random() * 50) + 5 },
        // { xPos: Math.floor(Math.random() * 790) + 55, yPos: -40, radius: Math.floor(Math.random() * 50) + 5 },
        // { xPos: Math.floor(Math.random() * 790) + 55, yPos: -90, radius: Math.floor(Math.random() * 50) + 5 },
        // { xPos: Math.floor(Math.random() * 790) + 55, yPos: -50, radius: Math.floor(Math.random() * 50) + 5 },
        // { xPos: Math.floor(Math.random() * 790) + 55, yPos: -10, radius: Math.floor(Math.random() * 50) + 5 },
        // { xPos: Math.floor(Math.random() * 790) + 55, yPos: 0, radius: Math.floor(Math.random() * 50) + 5 },
      ]
    }


    this.delete = this.delete.bind(this);
    this.toggleStart = this.toggleStart.bind(this)
    this.moveCircle = this.moveCircle.bind(this);
    this.resetCircle = this.resetCircle.bind(this);
    this.addCircle = this.addCircle.bind(this);
    //this.createCircles = this.createCircles.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    setInterval(this.resetCircle, 5000);    
    console.log(window.innerWidth, 'width')
  }

  toggleStart() {
    this.setState({
      start: !this.state.start
    }, () => {
      if (this.state.start) {
        this.startGameInterval = setInterval(this.moveCircle, (1000 / this.state.speed))
      } else {
        clearInterval(this.startGameInterval)
      }
    });
  }

  onChange(value) {
    this.setState({ speed: value }, () => {
      clearInterval(this.startGameInterval);
      if(this.state.start) {
       this.startGameInterval = setInterval(this.moveCircle, (1000 / value));
     }
    })
  }

  moveCircle() {
    var copy = [...this.state.circles]
    var newCircles = copy.map(circle => {
      circle.yPos++;
      return circle
    })
    this.setState({ circles: newCircles })
  }

  resetCircle() {
    var copy = [...this.state.circles]
    var resetMissedBubbles = copy.map(circle => {
      return circle.yPos < 601 ? circle : { xPos: Math.floor(Math.random() * window.innerWidth -100) + 100, yPos: Math.floor(Math.random() * -200) + (-10), radius: Math.floor(Math.random() * 50) + 5}
    })
    this.setState({
      circles: resetMissedBubbles,
    })
  }

  addCircle() {
    this.setState({
      circles: this.state.circles.concat({ xPos: Math.floor(Math.random() * window.innerWidth -100) + 100, yPos: Math.floor(Math.random() * -200) + (-10), radius: Math.floor(Math.random() * 50) + 5 })
      // circles: this.state.circles.concat({ xPos: Math.floor(Math.random() * 790) + 55, yPos: Math.floor(Math.random() * -200) + (-10), radius: Math.floor(Math.random() * 50) + 5 })
    })
  }

  delete(e) {
    if (this.state.start) {
      e.target.destroy();
    }
    var newScore = this.state.score + 1
    this.setState({ score: newScore })
    this.addCircle();
  }

  render() {

    return (
      <div>
        Score: {this.state.score}
        <div>
          <Play toggleStart={this.toggleStart} startText={this.state.start} />
        </div>
       
        <div style={styles.root}>
          <div style={styles.sliderWrapper}>
          <Slider
            step={5}
            value={this.state.speed}
            min={10}
            max={100}
            onChange={this.onChange}
          />
          </div>
        </div>
  
        <Stage width={window.innerWidth} height={window.innerHeight} className="stage">

          <Layer>
            <Text fontSize={15} />
            {console.log(window.innerHeight, window.innerWidth)}
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

