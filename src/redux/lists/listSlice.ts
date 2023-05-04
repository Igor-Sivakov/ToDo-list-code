import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TaskType } from "../tasks/taskSlice"
import { fetchActiveList, fetchAddList, fetchEditList, fetchLists, fetchRemoveList } from "./asyncActions"


export type ListType = {
  id: string
  name: string
  colorId: string
  [key: string]: any
}

interface InitialStateLists {
  lists: {
    items: ListType[]
    chosenItem: ListType | null
    status: 'loading' | 'success' | 'error'
  }
}

const initialState: InitialStateLists = {
  lists: {
    items: [],
    chosenItem: null,
    status: 'loading'
  }
}


const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addListTasksCount(state, action: PayloadAction<TaskType[]>) {
      state.lists.items = state.lists.items.map((list) => ({
        ...list,
        tasksCount: action.payload.filter((task) => task.listId === list.id).length,
      }))
      if (state.lists.chosenItem) {
        state.lists.chosenItem.tasksCount = action.payload.filter((task) => task.listId === state.lists.chosenItem?.id).length
      }
    },
    getChosenList(state, action: PayloadAction<string | null>) {
      const chosenList = state.lists.items.find((item) => item.id === action.payload)
      state.lists.chosenItem = chosenList ? chosenList : null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.lists.items = []
        state.lists.status = 'loading'
      })
      .addCase(fetchLists.fulfilled, (state, action: PayloadAction<ListType[]>) => {
        state.lists.items = action.payload
        state.lists.status = 'success'
      })
      .addCase(fetchLists.rejected, (state) => {
        state.lists.items = []
        state.lists.status = 'error'
      })
      .addCase(fetchAddList.pending, (state) => {
        state.lists.status = 'loading'
      })
      .addCase(fetchAddList.fulfilled, (state, action: PayloadAction<ListType>) => {
        state.lists.items = [...state.lists.items, action.payload]
        state.lists.status = 'success'
      })
      .addCase(fetchAddList.rejected, (state) => {
        state.lists.status = 'error'
      })
      .addCase(fetchEditList.pending, (state) => {
        state.lists.status = 'loading'
      })
      .addCase(fetchEditList.fulfilled, (state, action: PayloadAction<ListType>) => {
        state.lists.items = state.lists.items.map((item) => (item.id === action.payload.id ? (item = action.payload) : item))
        state.lists.status = 'success'
      })
      .addCase(fetchEditList.rejected, (state) => {
        state.lists.status = 'error'
      })
      .addCase(fetchRemoveList.fulfilled, (state, action: PayloadAction<ListType | undefined>) => {
        state.lists.items = state.lists.items.filter((item) => item.id !== action.payload?.id)
        state.lists.status = 'success'
      })
      .addCase(fetchRemoveList.rejected, (state) => {
        state.lists.status = 'error'
      })
      .addCase(fetchActiveList.fulfilled, (state, action: PayloadAction<ListType | undefined>) => {
        action.payload ? state.lists.chosenItem = action.payload : state.lists.chosenItem = null
      })

  },
})


export const { addListTasksCount, getChosenList } = listSlice.actions

export default listSlice.reducer