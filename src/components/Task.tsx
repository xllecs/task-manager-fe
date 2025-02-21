import { useDraggable } from '@dnd-kit/core'

import '../assets/styles/components/Task.css'
import { setTask } from '../redux/Task'
import { useDispatch } from 'react-redux'
import { openModal } from '../redux/Modal'

const Task = ({ task }) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: task.id,
    data: { status: task.status }
  })
  const dispatch = useDispatch()

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined

  const openTaskModal = () => {
    dispatch(setTask(task))
    dispatch(openModal())
  }

  return (
    <div className="task-wrapper" onClick={openTaskModal} ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div className="task-title">{task.title}</div>
      <div className="task-description">{task.description}</div>
    </div>
  )
}

export default Task
