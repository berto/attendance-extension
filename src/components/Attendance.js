import React, { Component } from 'react'
import { List } from 'antd'
import Cohorts from './Cohorts'
import Student from './Student'
import db from '../firebase.js'

class Attendance extends Component {
  state = { 
    students: [],
    cohorts: [],
    loading: true,
    error: "",
    selectedCohort: localStorage.getItem('defaultCohort') || 'all'
  }

  componentDidMount = async () => {
    try {
      const attendance = await db.getStudents()
      const students = attendance.students.map((student) => {
        return Object.assign({
          tempTotal: student.total,
          tempUnexcused: student.unexcused,
          editTotal: false,
          editUnexcused: false
        }, student)
      })
      this.setState({ 
        students: students,
        cohorts: attendance.cohorts,
        loading: false 
      })
    } catch (error) {
      this.setState({ error, loading: false})
    }
  }

  displayError = (error) => {
      this.setState({ error, loading: false})
  }

  handleDropdown = ({ key }) => {
    localStorage.setItem('defaultCohort', key)
    this.setState({
      selectedCohort: key,
    })
  }

  updateStudent = async (id, key, total) => {
    try {
      this.updateStudentProps(id, {
        key: total,
        editTotal: false,
        editUnexcused: false
      })
      await db.updateStudent(id, key, total)
      return true
    } catch (_) {
      this.props.displayError('unable to update')
    }
  }

  updateStudentProps = async (id, info) => {
    const students = this.state.students.map((student) => {
      if (student.id === id) {
        student = Object.assign(student, info)
      }
      return student
    })
    this.setState({ students })
  }

  render() {
    let displayStudents = this.state.students 
    if (this.state.selectedCohort !== 'all') {
      displayStudents = this.state.students
        .filter((student) => student.cohort === this.state.selectedCohort)
        .sort((a, b) => a.number - b.number)
    }
    return this.state.loading 
      ? (
          <div>
            <h2>LOADING...</h2>
            <p>check the console if it takes too long</p>
          </div>
        ) 
      : (
          <div>
            <h6 className="error">{this.state.error}</h6>
            <Cohorts menu={this.state.cohorts} selected={this.state.selectedCohort} handler={this.handleDropdown}/>
            <List
              size="small"
              bordered
              dataSource={displayStudents}
              renderItem={student => (
                <Student 
                  displayError={this.displayError}
                  updateStudentProps={this.updateStudentProps}
                  updateStudent={this.updateStudent}
                  student={student} />
              )}/>
          </div>
        )
  }
}

export default Attendance;
