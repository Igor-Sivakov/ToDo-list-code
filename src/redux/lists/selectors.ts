import { RootState } from "../store"

export const getListItemsSelect = (state: RootState) => (
  state.list.lists.items
)

export const getListStatusSelect = (state: RootState) => (
  state.list.lists.status
)

export const getChosenTaskSelect = (state: RootState) => (
  state.list.lists.chosenItem
)