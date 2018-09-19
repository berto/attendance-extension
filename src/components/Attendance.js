import React, { Component } from 'react'
import { List } from 'antd'
import Cohorts from './Cohorts'
import db from '../firebase.js'

class Attendance extends Component {
  state = { 
    students: { all: [] },
    loading: true,
    error: "",
    selectedCohort: "all"
  }

  componentDidMount() {
    db.getStudents()
      .then(students => this.setState({ students, loading: false }))
      .catch(error => this.setState({ error, loading: false}))
  }

  handleDropdown = ({ key }) => {
    this.setState({
      selectedCohort: key,
    })
  }

  render() {
    return this.state.loading ?
        (
          <div>
            <h2>LOADING...</h2>
            <p>check the console if it takes too long</p>
          </div>
        ) 
        : 
        (
          <div>
            <h6>{this.state.error}</h6>
            <Cohorts menu={this.state.students} selected={this.state.selectedCohort} handler={this.handleDropdown}/>
            <List
              size="small"
              bordered
              dataSource={this.state.students[this.state.selectedCohort]}
              renderItem={student => (
                <List.Item 
                  className={student.total > 20 || student.unexcused > 10 ? student.total > 40 || student.unexcused > 15 ? 'bad' : 'ok' : 'good'}>
                  {student.name} 
                  <br/>
                  total: {student.total} 
                  <br />
                  unexcused: {student.unexcused}
                </List.Item>
              )}/>
          </div>
        )
  }
}

export default Attendance;
