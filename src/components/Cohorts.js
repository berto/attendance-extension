import React from 'react';
import { Menu, Dropdown, Button, Icon } from 'antd';

const Cohorts = (props) => {
  const menu = (
    <Menu onClick={props.handler}>
      {
        Object.keys(props.menu).map(cohort => (
          <Menu.Item key={cohort}>{cohort}</Menu.Item>
        ))
      }
    </Menu>
  )
  return (
    <Dropdown overlay={menu}>
      <Button className="ant-dropdown-link">
        {props.selected} <Icon type="down" className="cohorts-dropdown" />
      </Button>
    </Dropdown>
  )
}

export default Cohorts;
