import React, { Component } from 'react';
import { Drawer, Icon } from 'antd';
import './App.css';
import Attendance from './components/Attendance';

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
          <Attendance />
        </Drawer>
      </div>
    );
  }
}

export default App;
