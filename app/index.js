import React from 'react';
import ReactDom from 'react-dom';
import Circle from './component/Circle'
require('./index.css');

class App extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    x : 100,
    y : 200,
    score: 0,
    radius : 30,
    intervalId: null,
    bubbleCSS1: "bubble x1",
    bubbleCSS2: "bubble x2",
    bubbleCSS3: "bubble x3",
    bubbleCSS4: "bubble x4",
    bubbleCSS5: "bubble x5",
    bubbleCSS6: "bubble x6",
    bubbleCSS7: "bubble x7",
    bubbleCSS8: "bubble x8",
    bubbleCSS9: "bubble x9",
    bubbleCSS10: "bubble x10",
    popBubbleCSS: "is-popping"
  };
  //  this.moveIt = this.moveIt.bind(this);
  //  this.handleMouseMove = this.handleMouseMove.bind(this);
   this.handleCatchCircle = this.handleCatchCircle.bind(this);
}

//  componentDidMount() {
//      var intervalId = setInterval(this.moveIt, 500);
//       //store intervalId in the state so it can be accessed later:
//      this.setState({
//        intervalId: intervalId
//      });
//    }

//    componentWillUnmount() {
//       //use intervalId from the state to clear the interval
//      clearInterval(this.state.intervalId);
//    }

//    moveIt() {
//       //setState method is used to update the state
//      this.setState({
//        x: this.state.x - 10,
//        y: this.state.y - 20
//      });
//    }


// moveIt() {

//   setInterval(this.setState({
//       y: this.state.y + 100
//     }), 2000)
    
//   };

  // handleMouseMove(e) {
  //   const x = e.clientX;
  //   const y = e.clientY;
  //   this.setState({
  //     x,
  //     y
  //   });
  // }

  // toggleBubbleClass() {
  //   this.setState({
  //     bubbleCSS1: "is-popping x1"
  //   })
  // }

  handleCatchCircle(e) {
    this.setState({
      score: this.state.score + 1,
      
    });
  }

  render() {
    
    return(

      
        <div>
                Hello! I'm Bubbilicious. Pop me!
                Score: {this.state.score}
        <div className="background-wrap">
        <Circle/>
        </div>
              
               
                  
           
        </div>
            )
  }
}


ReactDom.render(<App />, document.getElementById('app'));

