import React from 'react';
import ReactDom from 'react-dom';
import Circle from './component/Circle';
require('./index.css');


class App extends PureComponent {
constructor(props) {
  super(props);
  this.state = {
   width: 0,
   height: 0
  };
  
}

  
  render() {
    
  
    return(

      <div>

        <div>
          {/* Hello! I'm Bubblicious. Pop me! */}
          Score: {this.state.score}
        </div>
        <div className="background-wrap">
          
           
       
        </div>

      </div>
            )
  }
}


ReactDom.render(<App />, document.getElementById('app'));

