import React, { Component } from 'react';
import { List, Menu, Dropdown, Button, Icon } from 'antd';
import './Attendance.css';

const students = [
  { name: 'Jimmy Jimbo', absences: 0 },
  { name: 'Tom Tombo', absences: 3 },
  { name: 'Rob Rumbo', absences: 1 }
];

class Attendance extends Component {
  state = { cohort: 'All Students' };

  onClick = ({ key }) => {
    this.setState({
      cohort: key,
    });
  }

  menu = (
    <Menu onClick={this.onClick}>
      <Menu.Item key="All Students">All Students</Menu.Item>
      <Menu.Item key="g99">g99</Menu.Item>
      <Menu.Item key="g102">g102</Menu.Item>
      <Menu.Item key="g90">g90</Menu.Item>
    </Menu>
  )

  render() {
    return (
      <div>
        <Dropdown overlay={this.menu}>
          <Button className="ant-dropdown-link">
            {this.state.cohort} <Icon type="down" className="cohorts-dropdown" />
          </Button>
        </Dropdown>
        <List
          size="small"
          bordered
          dataSource={students}
          renderItem={student => (<List.Item>{student.name} - {student.absences}</List.Item>)}/>
      </div>
    )
  }
}

export default Attendance;
