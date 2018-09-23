import React from 'react';
import { List } from 'antd'

const Student = (props) => {

  const editTotal = (toggle, toFalse) => {
    props.updateStudentProps(props.student.id, {
      [toggle]: !props.student[toggle],
      [toFalse]: false
    })
  }

  const updateValue = (value, total) => {
    props.updateStudentProps(props.student.id, {
      [total]: value
    })
  }

  const handleKeyPress = (event, id, key, total) => {
    if (total && event.key === 'Enter') {
      props.updateStudent(id, key, total) 
    } 
  }

  const handleBlur = () => {
    props.updateStudentProps(props.student.id, {
      tempTotal: props.student.total,
      tempUnexcused: props.student.unexcused,
      editTotal: false,
      editUnexcused: false
    })
  }
  
  const total = props.student.tempTotal
  const unexcused = props.student.tempUnexcused

  return (
    <List.Item 
      className={total > 20 || unexcused > 10 ? total > 40 || unexcused > 15 ? 'bad' : 'ok' : 'good'}>
      <p>
        { 
          props.student.number
          ? `${props.student.number} - `
          : ""
        }
        { props.student.name }
      </p>
      <div>
      <label htmlFor="total"> total : </label>
        {
          props.student.editTotal
          ? <input 
              className="total" 
              type="number" 
              id="total" 
              value={total} 
              onBlur={this.handleBlur}
              onKeyDown={(event) => handleKeyPress(event, props.student.id, "total", total)}
              onChange={event => updateValue(event.target.value, "tempTotal")}/> 
          : <span onDoubleClick={() => editTotal("editTotal", "editUnexcused")} className="total">{total} </span> 
        }
      </div>
      <div>
        <label htmlFor="unexcused"> Unexcused : </label>
        {
          props.student.editUnexcused
          ? <input 
              className="total"  
              type="number" 
              id="unexcused"
              value={unexcused} 
              onBlur={handleBlur}
              onKeyPress={(event) => handleKeyPress(event, props.student.id, "unexcused", unexcused)}
              onChange={event => updateValue(event.target.value, "tempUnexcused")} /> 
          : <span onDoubleClick={(event) => editTotal("editUnexcused", "editTotal")} className="total">{unexcused} </span> 
        }
      </div>
    </List.Item>
  )
}

export default Student;
