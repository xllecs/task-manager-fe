import { useDispatch, useSelector } from 'react-redux'

import '../assets/styles/components/TaskModal.css'
import { closeModal } from '../redux/Modal'
import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { GET_TASKS, UPDATE_PRIORITY, UPDATE_STATUS } from './Queries'

const TaskModal = ({ task }) => {
  const [nextStatus, setNextStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [priorityIcon, setPriorityIcon] = useState()

  const handlePriorityIcon = (priority: string) => {
    switch (priority) {
      case 'LOW':
        return <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 48 48"><path fill="#4CAF50" d="m21.2 44.8l-18-18c-1.6-1.6-1.6-4.1 0-5.7l18-18c1.6-1.6 4.1-1.6 5.7 0l18 18c1.6 1.6 1.6 4.1 0 5.7l-18 18c-1.6 1.6-4.2 1.6-5.7 0z"/><g fill="#FFEB3B"><path d="M24 33.4L17 25h14z"/><path d="M22 14.8h4v12.3h-4z"/></g></svg>
      case 'MEDIUM':
        return <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 48 48"><path fill="#FFC107" d="m21.2 44.8l-18-18c-1.6-1.6-1.6-4.1 0-5.7l18-18c1.6-1.6 4.1-1.6 5.7 0l18 18c1.6 1.6 1.6 4.1 0 5.7l-18 18c-1.6 1.6-4.2 1.6-5.7 0z"/><g fill="#37474F"><circle cx="24" cy="24" r="2"/><circle cx="32" cy="24" r="2"/><circle cx="16" cy="24" r="2"/></g></svg>
      case 'HIGH':
        return <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 48 48"><path fill="#F44336" d="m21.2 44.8l-18-18c-1.6-1.6-1.6-4.1 0-5.7l18-18c1.6-1.6 4.1-1.6 5.7 0l18 18c1.6 1.6 1.6 4.1 0 5.7l-18 18c-1.6 1.6-4.2 1.6-5.7 0z"/><path fill="#fff" d="M21.6 32.7c0-.3.1-.6.2-.9c.1-.3.3-.5.5-.7c.2-.2.5-.4.8-.5s.6-.2 1-.2s.7.1 1 .2c.3.1.6.3.8.5c.2.2.4.4.5.7c.1.3.2.6.2.9s-.1.6-.2.9s-.3.5-.5.7c-.2.2-.5.4-.8.5c-.3.1-.6.2-1 .2s-.7-.1-1-.2s-.5-.3-.8-.5c-.2-.2-.4-.4-.5-.7s-.2-.5-.2-.9zm4.2-4.6h-3.6L21.7 13h4.6l-.5 15.1z"/></svg>
    }
  }

  useEffect(() => {
    setPriority(task.priority)
    setPriorityIcon(handlePriorityIcon(task.priority))
  }, [task.priority])

  const modal = useSelector(state => state.modal.value)
  const dispatch = useDispatch()

  const [updateStatus] = useMutation(UPDATE_STATUS)
  const [updatePriority] = useMutation(UPDATE_PRIORITY)
  
  const handleNextStatus = (id: string, currentStatus: string, nextStatus: string) => {
    setNextStatus(nextStatus)
    updateStatus({variables: { id, status: nextStatus }, refetchQueries: [
      {query: GET_TASKS, variables: { status: currentStatus }},
      {query: GET_TASKS, variables: { status: nextStatus }}
    ]})
  }

  const statusStyle = {
    'backgroundColor': (() => {
      const status = nextStatus || task.status
      if (status === 'TO_DO') return 'white'
      if (status === 'IN_PROGRESS') return 'blue'
      if (status === 'DONE') return 'green'
    })()
  }

  const handleNextPriority = (id: string, nextPriority: string) => {
    setPriority(nextPriority)
    setPriorityIcon(handlePriorityIcon(nextPriority))

    updatePriority({variables: { id, priority: nextPriority }, refetchQueries: [
      {query: GET_TASKS, variables: { status: task.status }},
    ]})
  }

  const closeTaskModal = () => {
    dispatch(closeModal())
  }

  return (
    <>
      {modal && <div className="task-modal-wrapper">
        <div className="task-modal-content">
          <div className="task-modal-left">
            <div className="title">{task.title}</div>
            <div className="description">{task.description}</div>
          </div>
          <div className="task-modal-right">
            <div className="current-status" style={statusStyle}>{nextStatus ? nextStatus : task.status} <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M12.707 15.707a1 1 0 0 1-1.414 0L5.636 10.05A1 1 0 1 1 7.05 8.636l4.95 4.95l4.95-4.95a1 1 0 0 1 1.414 1.414l-5.657 5.657Z"/></g></svg>
              <ul className="statuses">
                <li onClick={() => handleNextStatus(task.id, task.status, 'TO_DO')}>To Do</li>
                <li onClick={() => handleNextStatus(task.id, task.status, 'IN_PROGRESS')}>In Progress</li>
                <li onClick={() => handleNextStatus(task.id, task.status, 'DONE')}>Done</li>
              </ul>
            </div>
            <div className="assignee">{task.assignee ? task.assignee.username : 'Unassigned'}</div>
            <div className="reporter">{task.reporter.username}</div>
            <div className="current-priority">{priorityIcon} {priority ? priority : task.priority}
              <ul className='priorities'>
                <li onClick={() => handleNextPriority(task.id, 'LOW')}>Low</li>
                <li onClick={() => handleNextPriority(task.id, 'MEDIUM')}>Medium</li>
                <li onClick={() => handleNextPriority(task.id, 'HIGH')}>High</li>
              </ul>
            </div>
            <div className="labels">{task.labels.map((label, labelIndex: number) => (
              <div key={labelIndex} className="label">{label.tag}</div>
            ))}</div>
            <div className="close" onClick={closeTaskModal}>Close</div>
          </div>
        </div>
      </div>}
    </>
  )
}

export default TaskModal
