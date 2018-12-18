const React = require('react');
const ReactDom = require('react-dom');
import random from 'lodash/number/random';
import range from 'lodash/utility/range';
require('./index.css');

class App extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    x : 200,
    y : 200,
    score: 0,
    velX : 5,
    velY : 2,
    ballPosX : 100,
    ballPosY : 50,
    radius : 10,
  };
  this.moveIt = this.moveIt.bind(this);
  this.handleMouseMove = this.handleMouseMove.bind(this);
  this.handleCatchCircle = this.handleCatchCircle.bind(this);
  this.animate = this.animate.bind(this);
}

moveIt() {

  setInterval(this.setState({
      y: this.state.y + 100
    }), 2000)
    
  };

  handleMouseMove(e) {
    const x = e.clientX;
    const y = e.clientY;
    this.setState({
      x,
      y
    });
  }

  componentWillMount() {
    setInterval(this.animate, 50);
  }

  handleCatchCircle(e) {
    this.setState({
      score: this.state.score + 1
    });
  }

  animate() {
      // draw ball at ballPosX, ballPosY coordinates
      // ctx.arc(ballPosX, ballPosY, radius, 0, Math.PI * 180, false)
      // // fill in colours etc

      // // move ball
      // ballPosX += velX;
      // ballPosY += velY;

      // // do boundary detection for bounce
      // if (ballPosX + radius > ctx.width || ballPosX - radius < 0) {
      //   // change velX to negative to bounce the ball the oposite X direction
      //   velX *= -1;
      // }
  }

  render() {

    
    return(

      
        <div>
                Hello! I'm Bubbilicious. Pop me!
                Score: {this.state.score}
                <div className = "background-wrap" >
                  <div class= "bubble x1"> </div> 
                  <div class = "bubble x2"> </div> 
                  <div class = "bubble x3"> </div> 
                  <div class = "bubble x4"> </div> 
                  <div class = "bubble x5" > </div> 
                  <div class = "bubble x6" > </div> 
                  <div class = "bubble x7" > </div> 
                  <div class = "bubble x8" > </div> 
                  <div class = "bubble x9"> </div> 
                  <div class = "bubble x10" > </div> 
                </div>
                {/* <div className="circle" >

                <svg className = "circle"
                height = "1000"
                width = "1000" >
                  <circle 
                  className = "circle"
                   cx = {
                     this.state.y
                   }
                   cy = {
                     this.state.y
                   }
                   r = {
                     45
                   }
                   strokeWidth = {
                     2.5
                   }
                   stroke = "#e74c3c"
                   fill = "#f1c40f"
                   onClick = {
                     this.moveIt
                   }
                   />
                </svg>
                 </div> */}
              </div>
            )
  }
}

ReactDom.render(<App />, document.getElementById('app'));

