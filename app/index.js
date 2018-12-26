const React = require('react');
const ReactDom = require('react-dom');
import random from 'lodash/number/random';
import range from 'lodash/utility/range';
require('./index.css');

class App extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    x : 100,
    y : 200,
    score: 0,
    radius : 30,
    circles: [],
    intervalId: null
  };
  this.moveIt = this.moveIt.bind(this);
  this.handleMouseMove = this.handleMouseMove.bind(this);
  this.handleCatchCircle = this.handleCatchCircle.bind(this);
}

componentDidMount() {
    var intervalId = setInterval(this.moveIt, 500);
    // store intervalId in the state so it can be accessed later:
    this.setState({
      intervalId: intervalId
    });
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  }

  moveIt() {
    // setState method is used to update the state
    this.setState({
      x: this.state.x - 10,
      y: this.state.y - 20
    });
  }


// moveIt() {

//   setInterval(this.setState({
//       y: this.state.y + 100
//     }), 2000)
    
//   };

  handleMouseMove(e) {
    const x = e.clientX;
    const y = e.clientY;
    this.setState({
      x,
      y
    });
  }

  handleCatchCircle(e) {
    this.setState({
      score: this.state.score + 1
    });
  }

  
  render() {

    
    return(

      
        <div>
                Hello! I'm Bubbilicious. Pop me!
                Score: {this.state.score}
          
                {/* <div className = "background-wrap" onClick={this.handleCatchCircle}>
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
                </div> */}
                <div className="circle" >

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
                     this.state.radius
                   }
                   strokeWidth = {
                     2.5
                   }
                   stroke = "#e74c3c"
                   fill = "#f1c40f"
                   onClick={this.handleCatchCircle}
                   />
                </svg>
                 </div> 
        </div>
            )
  }
}

ReactDom.render(<App />, document.getElementById('app'));

