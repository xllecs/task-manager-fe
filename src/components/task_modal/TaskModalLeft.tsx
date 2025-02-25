import { useState } from "react"

import { useMutation } from "@apollo/client"
import { UPDATE_TASK } from "../Queries"

const TaskModalLeft = ({ task }) => {
  const [taskInput, setTaskInput] = useState({
    title: task.title,
    description: task.description || '',
  })
  const [updateTask] = useMutation(UPDATE_TASK)

  const handleTaskUpdate = () => {
    if (taskInput.title !== task.title) {
      console.log('here')
      updateTask({variables: { taskId: task.id, ...taskInput }})
    }
  }

  const handleChange = (e) => {
    setTaskInput({
      ...taskInput,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="task-modal-left">
      <input
        type="text"
        name="title"
        value={taskInput.title}
        onChange={handleChange}
        onBlur={handleTaskUpdate}
      />

      <textarea></textarea>
      {/* <div className="description">{task.description}</div> */}
    </div>
  )
}

export default TaskModalLeft
