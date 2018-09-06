import React, { Component } from 'react';
import { Drawer, Button, Icon } from 'antd';
import './App.css';

class App extends Component {
  state = { visible: false, placement: 'left' };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div className="App">
        <Icon className="open" type="caret-right" theme="outlined" onClick={this.showDrawer} />
        <Drawer
          title="Attendance"
          placement="left"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    );
  }
}

export default App;
