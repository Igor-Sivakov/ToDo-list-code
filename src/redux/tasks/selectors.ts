import { RootState } from "../store"

export const getTaskItemsSelect = (state: RootState) => (
  state.task.tasks.items
)

export const getTaskStatusSelect = (state: RootState) => (
  state.task.tasks.status
)