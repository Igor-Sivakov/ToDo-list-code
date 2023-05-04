import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchAddTask, fetchCompleteTask, fetchEditTask, fetchRemoveTask, fetchTasks } from "./asyncActions"


export type TaskType = {
  listId: string
  text: string
  completed: boolean
  id: string
}

interface InitialStateTasks {
  tasks: {
    items: TaskType[]
    status: 'loading' | 'success' | 'error'
  }
}

const initialState: InitialStateTasks = {
  tasks: {
    items: [],
    status: 'loading'
  }
}


const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.tasks.items = []
        state.tasks.status = 'loading'
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<TaskType[]>) => {
        state.tasks.items = action.payload
        state.tasks.status = 'success'
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.tasks.items = []
        state.tasks.status = 'error'
      })
      .addCase(fetchAddTask.pending, (state) => {
        state.tasks.status = 'loading'
      })
      .addCase(fetchAddTask.fulfilled, (state, action: PayloadAction<TaskType>) => {
        state.tasks.items = [...state.tasks.items, action.payload]
        state.tasks.status = 'success'
      })
      .addCase(fetchAddTask.rejected, (state) => {
        state.tasks.status = 'error'
      })
      .addCase(fetchEditTask.pending, (state) => {
        state.tasks.status = 'loading'
      })
      .addCase(fetchEditTask.fulfilled, (state, action: PayloadAction<TaskType>) => {
        state.tasks.items = state.tasks.items.map((item) => (item.id === action.payload.id ? (item = action.payload) : item))
        state.tasks.status = 'success'
      })
      .addCase(fetchEditTask.rejected, (state) => {
        state.tasks.status = 'error'
      })
      .addCase(fetchRemoveTask.fulfilled, (state, action: PayloadAction<TaskType | undefined>) => {
        state.tasks.items = state.tasks.items.filter((item) => item.id !== action.payload?.id)
        state.tasks.status = 'success'
      })
      .addCase(fetchRemoveTask.rejected, (state) => {
        state.tasks.status = 'error'
      })
      .addCase(fetchCompleteTask.fulfilled, (state, action: PayloadAction<TaskType>) => {
        state.tasks.items = state.tasks.items.map((item) => (item.id === action.payload.id ? (item = action.payload) : item))
        state.tasks.status = 'success'
      })
      .addCase(fetchCompleteTask.rejected, (state) => {
        state.tasks.status = 'error'
      })
  },
})


export default taskSlice.reducer