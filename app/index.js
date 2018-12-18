const React = require('react');
const ReactDom = require('react-dom');
import random from 'lodash/number/random';
import range from 'lodash/utility/range';
require('./index.css');

class App extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    x : 500,
    y : 500,
    score: 0
  };
  this.moveIt = this.moveIt.bind(this);
  this.handleMouseMove = this.handleMouseMove.bind(this);
  this.handleCatchCircle = this.handleCatchCircle.bind(this);
}

moveIt() {

  setInterval(this.setState({
      y: this.state.y + 10
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
                <div className="circle" >
                <svg className = "circle"
                height = "1000"
                width = "1000" >
                  <circle 
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
                   onClick = {this.handleCatchCircle}
                   />
                </svg>
                 </div>
              </div>
            )
  }
}

ReactDom.render(<App />, document.getElementById('app'));

