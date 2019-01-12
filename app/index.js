import React from 'react';
import ReactDom from 'react-dom'
require('./index.css');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      bubbles: [],
      bubbleClass: 'bubble',
      bubbleClasses: ["bubble x1", "bubble x2", "bubble x3", "bubble x4", "bubble x5", "bubble x6", "bubble x7", "bubble x8", "bubble x9", "bubble x10"]
    };
    this.addBubble = this.addBubble.bind(this);
    this.popBubble = this.popBubble.bind(this);
  }

  componentWillMount() {
    //setInterval(this.addBubble, 2000);
  }

  addBubble() {
    // this.setState({
    //   bubbles: this.state.bubbles.concat(
    //     <div 
    //       onClick={() => this.popBubble()}
    //       className={this.state.bubbleClasses[Math.floor(Math.random() * 10)]}
    //       >
    //       </div>)
    // })
    this.setState({
      bubbles: this.state.bubbles.concat(this.state.bubbleClasses[Math.floor(Math.random() * 10)])
    })
  }

  popBubble(index, bubbleClass) {

    var copy = [...this.state.bubbles]
    var filtered = copy.filter((item, i) => {
      return i !== index;
    })

    var points = Number(bubbleClass[8])

    this.setState({
      bubbles: filtered,
      score: this.state.score + points,
      
    })

  }


  render() {

    console.log('bubble arr', this.state.bubbles)
    return (
      <div>
        Hello! I'm Bubbilicious. Pop me!
        Score: {this.state.score}
        <div className="background-wrap" >
          {this.state.bubbles.map((bubble, i) => {
            return <div key={i} onClick={() => this.popBubble(i, bubble)} className={bubble}></div>;
          })}
        </div>
      </div>
    )
  }
}
ReactDom.render(<App />, document.getElementById('app'));

/*
<div className="bubble x1"> </div>
<div className="bubble x2"> </div>
<div className="bubble x3"> </div>
<div className="bubble x4"> </div>
<div className="bubble x5"> </div>
<div className="bubble x6"> </div>
<div className="bubble x7"> </div>
<div className="bubble x8"> </div>
<div className="bubble x9"> </div>
<div className="bubble x10"> </div>
          */