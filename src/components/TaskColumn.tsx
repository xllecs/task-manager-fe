import { useDroppable } from "@dnd-kit/core"

import { useQuery } from "@apollo/client"
import { GET_TASKS } from "./Queries"

import Task from "./Task"

import '../assets/styles/components/TaskColumn.css'

const TaskColumn = ({id, title, status}) => {
  const { loading, error, data } = useQuery(GET_TASKS, {variables: {status}})

  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data: { status },
  })

  const style = {
    border: isOver ? "1px solid red" : undefined
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  return (
    <div className="task-column-wrapper" ref={setNodeRef} style={style}>
      <div className="title">{title} {data.tasks.length}</div>
      {data.tasks.map((task: { id: string, title: string, description: string, status: string }, taskIndex: number) => (
        <Task key={taskIndex} task={task} />
      ))}
    </div>
  )
}

export default TaskColumn
