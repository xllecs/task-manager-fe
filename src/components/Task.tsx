import { useDraggable } from '@dnd-kit/core'
import '../assets/styles/components/Task.css'

const Task = ({ id, title, description, status }) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: id,
  })

  console.log(id)

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined

  return (
    <div className="task-wrapper" ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div className="task-title">{title}</div>
      <div className="task-description">{description}</div>
      <div className="task-status">{status}</div>
    </div>
  )
}

export default Task
