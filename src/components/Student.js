import React, { Component } from 'react';
import { List } from 'antd'

class Student extends Component {
  constructor(props) {
    super(props)
    this.state = {
      student: props.student,
      editTotal: false,
      editUnexcused: false
    }
  }

  editTotal = (toggle, toFalse) => {
    this.setState({
      [toggle]: !this.state[toggle],
      [toFalse]: false
    })
  }

  updateValue = (value, total) => {
    this.setState((state) => {
      state.student[total] = value
      return state
    })
  }

  handleKeyPress = async (event, student, key, total) => {
    if (event.key === 'Enter') {
      const ok = await this.props.updateStudent(student.id, key, total) 
      if (ok) {
        this.setState({
          editTotal: false,
          editUnexcused: false
        })
      } else {
        this.props.displayError('unable to update')
      }
    } 
  }

  handleBlur = () => {
    this.setState({
      editTotal: false,
      editUnexcused: false
    })
  }

  render() {
    const total = this.props.student.total
    const unexcused = this.props.student.unexcused
    return (
      <List.Item 
        className={total > 20 || unexcused > 10 ? total > 40 || unexcused > 15 ? 'bad' : 'ok' : 'good'}>
        <p>{this.props.student.name}</p>
        <p>{this.state.error}</p>
        <div>
        <label htmlFor="total"> total : </label>
          {
            this.state.editTotal
            ? <input 
                className="total" 
                type="number" 
                id="total" 
                value={total} 
                onBlur={this.handleBlur}
                onKeyDown={(event) => this.handleKeyPress(event, this.props.student, "total", total)}
                onChange={event => this.updateValue(event.target.value, "total")}/> 
            : <span onDoubleClick={() => this.editTotal("editTotal", "editUnexcused")} className="total">{total} </span> 
          }
        </div>
        <div>
          <label htmlFor="unexcused"> Unexcused : </label>
          {
            this.state.editUnexcused
            ? <input 
                className="total"  
                type="number" 
                id="unexcused"
                value={unexcused} 
                onBlur={this.handleBlur}
                onKeyPress={(event) => this.handleKeyPress(event, this.props.student, "unexcused", unexcused)}
                onChange={event => this.updateValue(event.target.value, "unexcused")} /> 
            : <span onDoubleClick={(event) => this.editTotal("editUnexcused", "editTotal")} className="total">{unexcused} </span> 
          }
        </div>
      </List.Item>
    )
  }
}

export default Student;
