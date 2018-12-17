const React = require('react');
const ReactDom = require('react-dom');
require('./index.css');

class App extends React.Component {

  render() {
    return(
      <div>
        Hello! I'm Bubbilicious. Pop me!
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'));