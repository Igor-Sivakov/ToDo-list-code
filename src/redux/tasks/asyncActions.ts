import { createAsyncThunk } from "@reduxjs/toolkit"
import { taskAPI } from "../../API/API"
import { TaskType } from "./taskSlice"

export const fetchTasks = createAsyncThunk('task/fetchTasks', async (_, { rejectWithValue }) => {
  try {
    return await taskAPI.getTasks()
  } catch (err) {
    console.warn(err)
    return rejectWithValue('some error')
  }
})

export const fetchAddTask = createAsyncThunk<TaskType, { id: string, text: string }>('task/fetchAddTask', async ({ id, text }, { rejectWithValue }) => {
  try {
    const newTask: TaskType = {
      listId: id,
      text: text,
      completed: false,
      id: '',
    }
    return await taskAPI.addTask(newTask)
  } catch (err) {
    console.warn(err)
    return rejectWithValue('some error')
  }
})

export const fetchCompleteTask = createAsyncThunk<TaskType, { task: TaskType, completed: boolean }>('task/fetchCompleteTask', async ({ task, completed }, { rejectWithValue }) => {
  try {
    const isCompletededTask = { ...task, completed }
    return await taskAPI.editTask(task.id, isCompletededTask)
  } catch (err) {
    console.warn(err)
    return rejectWithValue('some error')
  }
})

export const fetchEditTask = createAsyncThunk<TaskType, { task: TaskType, text: string }>('task/fetchEditTask', async ({ task, text }, { rejectWithValue }) => {
  try {
    const editedTask = { ...task, text }
    return await taskAPI.editTask(task.id, editedTask)
  } catch (err) {
    console.warn(err)
    return rejectWithValue('some error')
  }
})

export const fetchRemoveTask = createAsyncThunk<TaskType | undefined, string>('task/fetchRemoveTask', async (id, { rejectWithValue }) => {
  if (window.confirm('Do you really want to delete the task?')) {
    try {
      return await taskAPI.removeTask(id)
    } catch (err) {
      console.warn(err)
      return rejectWithValue('some error')
    }
  }
})