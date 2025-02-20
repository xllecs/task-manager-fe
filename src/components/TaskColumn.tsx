import { gql, useQuery } from "@apollo/client"
import Task from "./Task"
import { useDroppable } from "@dnd-kit/core"

const GET_TASKS = gql`
  query($status: String!) {
    tasks(status: $status) {
      id
      title
      description
      status
    }
  }
`

const TaskColumn = ({id, status}) => {
  const { loading, error, data } = useQuery(GET_TASKS, {variables: {status: status.split(' ').join('-').toLowerCase()}})

  const { isOver, setNodeRef } = useDroppable({
    id: id,
  })

  const style = {
    border: isOver ? "1px solid red" : undefined
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  return (
    <div className="task-column-wrapper" ref={setNodeRef} style={style}>
      <div className="title">{status}</div>
      {data.tasks.map((task: { id: string, title: string, description: string, status: string }, taskIndex: number) => (
        <Task key={taskIndex} id={task.id} title={task.title} description={task.description} status={task.status} />
      ))}
    </div>
  )
}

export default TaskColumn
