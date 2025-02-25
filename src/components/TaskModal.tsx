import { useDispatch, useSelector } from 'react-redux'

import TaskModalLeft from './task_modal/TaskModalLeft'
import TaskModalRight from './task_modal/TaskModalRight'

import '../assets/styles/components/TaskModal.css'

const TaskModal = ({ task }) => {
  const modal = useSelector(state => state.modal.value)

  return (
    <>
      {modal && <div className="task-modal-wrapper">
        <div className="task-modal-content">
          <TaskModalLeft task={task} />
          <TaskModalRight task={task} />
        </div>
      </div>}
    </>
  )
}

export default TaskModal
