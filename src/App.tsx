import { DndContext } from '@dnd-kit/core'
import './App.css'
import TaskColumn from './components/TaskColumn'

function App() {
  return (
    <div className="app-wrapper">
      <DndContext>
        <div className="task-columns">
          <TaskColumn id={0} status={'TO DO'} />
          <TaskColumn id={1} status={'IN PROGRESS'} />
          <TaskColumn id={2} status={'DONE'} />
        </div>
      </DndContext>
    </div>
  )
}

export default App
