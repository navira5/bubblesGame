const React = require('react');
const ReactDom = require('react-dom');
require('./index.css');

class App extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    x : 500,
    y : 500
  };
  this.moveIt = this.moveIt.bind(this);
}

moveIt() {

    setInterval(this.setState({
      y: this.state.y + 10
    }), 2000)
    
  };

  render() {
    return(
      <div>
        Hello! I'm Bubbilicious. Pop me!
        <div className="circle" >
        < svg className = "circle"
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
           />
        </svg>
         </div>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'));