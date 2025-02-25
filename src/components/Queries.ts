import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query($status: String!) {
    tasks(status: $status) {
      id
      title
      description
      reporter { username }
      assignee { username }
      status
      priority
      labels { tag }
    }
  }
`

export const GET_USERS = gql`
  query {
    users { id username }
  }
`

export const UPDATE_TASK = gql`
  mutation($taskId: ID!, $title: String, $description: String) {
    updateTask(taskId: $taskId, title: $title, description: $description) {
      task { id }
    }
  }
`

export const SELECT_ASSIGNEE = gql`
  mutation($taskId: ID!, $userId: ID!) {
    selectAssignee(taskId: $taskId, userId: $userId) {
      task { assignee { username } }
    }
  }
`

export const UPDATE_STATUS = gql`
  mutation ($id: ID!, $status: String!) {
    updateStatus(taskId: $id, newStatus: $status) {
      task {
        id
        status
      }
    }
  }
`

export const UPDATE_PRIORITY = gql`
  mutation ($id: ID!, $priority: String!) {
    updatePriority(taskId: $id, newPriority: $priority) {
      task { id, priority }
    }
  }
`
