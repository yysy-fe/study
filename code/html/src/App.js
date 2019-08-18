import React, { Component } from 'react';


import "./App.less"

class App extends Component {

  componentDidMount() {
  }

  render() {
    let { nodes = [], edges = [] } = flowData;
    return (
      <div className="react-container">
      </div>
    )
  }
}

export default App;