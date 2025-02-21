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
