import React, { Component } from 'react'
import { List } from 'antd'
import Cohorts from './Cohorts'
import Student from './Student'
import db from '../firebase.js'

class Attendance extends Component {
  state = { 
    students: { all: [] },
    loading: true,
    error: "",
    selectedCohort: "all"
  }

  componentDidMount = async () => {
    try {
      const students = await db.getStudents()
      this.setState({ students, loading: false })
    } catch (error) {
      this.setState({ error, loading: false})
    }
  }

  displayError = (error) => {
      this.setState({ error, loading: false})
  }

  handleDropdown = ({ key }) => {
    const newStudents = Object.assign({}, this.state.students)
    this.setState({
      students: newStudents,
      selectedCohort: key,
    })
  }

  updateStudent = async (id, key, total) => {
    try {
      await db.updateStudent(id, key, total)
      return true
    } catch (_) {
      return false
    }
  }

  render() {
    return this.state.loading 
      ? (
          <div>
            <h2>LOADING...</h2>
            <p>check the console if it takes too long</p>
          </div>
        ) 
      : (
          <div>
            <h6>{this.state.error}</h6>
            <Cohorts menu={this.state.students} selected={this.state.selectedCohort} handler={this.handleDropdown}/>
            <List
              size="small"
              bordered
              dataSource={this.state.students[this.state.selectedCohort]}
              renderItem={student => (
                <Student 
                  displayError={this.displayError}
                  updateStudent={this.updateStudent}
                  student={student} />
              )}/>
          </div>
        )
  }
}

export default Attendance;
