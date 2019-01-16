import React from 'react';
import ReactDom from 'react-dom';
import Konva from 'konva';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import { Slider } from 'reactrangeslider';
import styles from './styles';
import Play from './Play';
import Bubble from './Bubble';
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
      radius: {
        min: 5,
        max: 50
      },
      start: false,
      speed: 50,
      circles: [
        { xPos: Math.floor(Math.random() * window.innerWidth - 100) + 100, yPos: -800, radius: Math.floor(Math.random() * 50) + 5 },
        { xPos: Math.floor(Math.random() * window.innerWidth - 100) + 100, yPos: -800, radius: Math.floor(Math.random() * 50) + 5 },
        { xPos: Math.floor(Math.random() * window.innerWidth - 100) + 100, yPos: -40, radius: Math.floor(Math.random() * 50) + 5 },
        { xPos: Math.floor(Math.random() * window.innerWidth - 100) + 100, yPos: -90, radius: Math.floor(Math.random() * 50) + 5 },
        { xPos: Math.floor(Math.random() * window.innerWidth - 100) + 100, yPos: -100, radius: Math.floor(Math.random() * 50) + 5 },
        { xPos: Math.floor(Math.random() * window.innerWidth - 100) + 100, yPos: -10, radius: Math.floor(Math.random() * 50) + 5 },
      ],
      divCircles: [{ yPos: 0 }, { yPos: 0 }, { yPos: 0 }, { yPos: 0 }, { yPos: 0 }]
    }


    //this.delete = this.delete.bind(this);
    this.toggleStart = this.toggleStart.bind(this)
    this.moveCircle = this.moveCircle.bind(this);
    //this.resetCircle = this.resetCircle.bind(this);
    //this.addCircle = this.addCircle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.removeCircle = this.removeCircle.bind(this);
    this.popCircle = this.popCircle.bind(this);
    this.makeCircle = this.makeCircle.bind(this);
  }

  componentDidMount() {

    //setInterval(this.resetCircle, 5000);

    // this.makeCircleInterval  = setInterval(this.addCircle, 2000);
    this.makeCircleInterval = setInterval(this.makeCircle, 2000);

  }

  componentDidUpdate() {

    // this.state.circles.length >= 30 ? clearInterval(this.makeCircleInterval) : null;
    this.state.circles.length >= 30 ? clearInterval(this.makeCircleInterval) : null;

  }

  toggleStart() {

    this.setState({ start: !this.state.start }, () => {
      console.log('bbbbbbbbbb', this.state.start);
      
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

    let circlesMoved = [...this.state.divCircles].map(circle => {
      circle.yPos += 1;
      return circle
    })

    // this.setState({ circles: newCircles })
    this.setState({ divCircles: circlesMoved })
  }

  // resetCircle() {
  //   let resetMissedBubbles = [...this.state.circles].map(circle => {
  //     return circle.yPos < 601 ? circle : { xPos: Math.floor(Math.random() * window.innerWidth - 100) + 100, yPos: Math.floor(Math.random() * -200) + (-10), radius: Math.floor(Math.random() * 50) + 5 }
  //   })
  //   this.setState({
  //     circles: resetMissedBubbles,
  //   })
  // }

  // addCircle() {
  //   this.setState({
  //     circles: this.state.circles.concat({ xPos: Math.floor(Math.random() * window.innerWidth - 100) + 100, yPos: Math.floor(Math.random() * -200) + (-10), radius: Math.floor(Math.random() * 50) + 5 })
  //     // circles: this.state.circles.concat({ xPos: Math.floor(Math.random() * 790) + 55, yPos: Math.floor(Math.random() * -200) + (-10), radius: Math.floor(Math.random() * 50) + 5 })
  //   })
  // }

  // delete(e) {

  //   if (this.state.start) {
  //     e.target.destroy();
  //   }
  //   var newScore = this.state.score + 1
  //   this.setState({ score: newScore })
  //   this.addCircle();
  // }

  makeCircle() {

    this.setState({ divCircles: this.state.divCircles.concat({ yPos: 0 })});

  }

  removeCircle(index) {
    let afterRemove = [...this.state.divCircles].map((item, i) => {
      return i !== index ? item : '';
    })

    this.setState({ divCircles: afterRemove})

  }

 
  popCircle(index, point) {

    this.removeCircle(index);

    this.setState( { score: point})
  }

  


  render() {
    const { start, speed, score, x, y, radius, circles, divCircles} = this.state;
    const randomSize = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
    const circleSize = randomSize.toString();
    const point = Number(randomSize.toString()[0]);
    const leftPos = Math.floor(Math.random() * (x.max - x.min + 1)) + x.min;
    const pointVal = {
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
    };
    //console.log('point', point, 'random size generated', randomSize, 'point value', pointVal[point])

    const circleStyle = {
      margin: '20px',
      width: '100px',
      height: '100px',
      backgroundColor: 'yellow',
      display: 'inline-block',
      borderRadius: '50%',
      top: '200px',
      left: '500px',
      position: 'absolute'
    }

    console.log('div circles', this.state.divCircles)

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


        {/* Display moving circles */}

        {divCircles.map((circle, i) => {
          
           <Bubble
                    key={i}
                    removeCircle={this.removeCircle}
                    popCircle={this.popCircle}
                    circleSize={circleSize}
                    point={pointVal[point]}
                    index={i}
                    color={'orange'}
                    leftPos={leftPos}
                    topPos={circle.yPos}
          
          />
        })}
       
  
          {/* <Stage width={window.innerWidth} height={window.innerHeight} className="stage">

            <Layer>
              <Text fontSize={15} />

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
          </Stage> */}
        </div>
      </div>
    )
  }
}


ReactDom.render(<App />, document.getElementById('app'));



