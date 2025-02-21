import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import './App.css'
import TaskColumn from './components/TaskColumn'
import { useMutation } from '@apollo/client'
import { GET_TASKS, UPDATE_STATUS } from './components/Queries'
import TaskModal from './components/TaskModal'
import { useSelector } from 'react-redux'

function App() {
  const [updateStatus] = useMutation(UPDATE_STATUS)
  const task = useSelector(state => state.task.value)

  const handleDragEnd = (event) => {
    const { active, over } = event

    const activeStatus = active.data.current.status
    const overStatus = over.data.current.status

    updateStatus({variables: { id: active.id, status: overStatus }, refetchQueries: [
      { query: GET_TASKS, variables: { status: activeStatus } },
      { query: GET_TASKS, variables: { status: overStatus } }
    ]})
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: .5
      }
    })
  )

  return (
    <div className="app-wrapper">
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <div className="task-columns">
          <TaskColumn id={0} title={'TO DO'} status={'TO_DO'} />
          <TaskColumn id={1} title={'IN PROGRESS'} status={'IN_PROGRESS'} />
          <TaskColumn id={2} title={'DONE'} status={'DONE'} />
        </div>
      </DndContext>
      <TaskModal task={task} />
    </div>
  )
}

export default App
