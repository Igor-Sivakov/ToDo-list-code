import { createAsyncThunk } from "@reduxjs/toolkit"

import DB from '../../assets/db.json'

import { listAPI } from "../../API/API"
import { ListType } from "./listSlice"

export const fetchLists = createAsyncThunk<ListType[], void>('list/fetchLists', async (_, { rejectWithValue }) => {
  try {
    const data = await listAPI.getLists()
    const items = data.map((item: ListType) => {
      item.color = DB.colors.filter(
        (color) => color.id === item.colorId
      )[0].name
      item.hex = DB.colors.filter(
        (color) => color.id === item.colorId
      )[0].hex

      return item
    })
    return items
  } catch (err) {
    console.warn(err)
    return rejectWithValue('some error')
  }
})

export const fetchActiveList = createAsyncThunk<ListType | undefined, string>('list/fetchActiveList', async (id) => {
  try {
    const data = await listAPI.getOneList(id)
    data.hex = DB.colors.find((c) => c.id === data.colorId)?.hex

    return data
  } catch (err) {
    console.warn(err)
  }
})

export const fetchAddList = createAsyncThunk<ListType, ListType>('list/fetchAddList', async (list, { rejectWithValue }) => {
  try {
    const data: ListType = await listAPI.addList(list)
    data.color = DB.colors.find((c) => c.id === data.colorId)?.name
    data.hex = DB.colors.find((c) => c.id === data.colorId)?.hex

    return data
  } catch (err) {
    console.warn(err)
    return rejectWithValue('some error')
  }
})

export const fetchEditList = createAsyncThunk<ListType, { list: ListType, value: string }>('list/fetchEditList', async ({ list, value }, { rejectWithValue }) => {
  try {
    const editedList: ListType = { ...list, name: value }
    const editedItem: ListType = await listAPI.editList(list.id, editedList)

    return editedItem
  } catch (err) {
    console.warn(err)
    return rejectWithValue('some error')
  }

})

export const fetchRemoveList = createAsyncThunk<ListType | undefined, string>('list/fetchRemoveList', async (id, { rejectWithValue }) => {
  if (window.confirm('Do you really want to delete the list?')) {
    try {
      return await listAPI.removeList(id)
    } catch (err) {
      console.warn(err)
      return rejectWithValue('some error')
    }
  }
})