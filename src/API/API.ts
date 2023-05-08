import axios from 'axios'

import { ListType } from '../redux/lists/listSlice'
import { TaskType } from '../redux/tasks/taskSlice'



const instance = axios.create({
  baseURL: 'https://6403264bf61d96ac487860d6.mockapi.io/',
})


export const listAPI = {
  async getLists() {
    return await instance.get<ListType[]>('lists').then(res => res.data)
  },
  async getOneList(id: string) {
    return await instance.get<ListType>(`lists/${id}`).then(res => res.data)
  },
  async addList(list: ListType) {
    return await instance.post<ListType>('lists', list).then(res => res.data)
  },
  async editList(id: string, list: ListType) {
    return await instance.put<ListType>(`lists/${id}`, list).then(res => res.data)
  },
  async removeList(id: string) {
    return await instance.delete<ListType>(`lists/${id}`).then(res => res.data)
  }
}

export const taskAPI = {
  async getTasks() {
    return await instance.get<TaskType[]>('tasks').then(res => res.data)
  },
  async addTask(task: TaskType) {
    return await instance.post<TaskType>('tasks', task).then(res => res.data)
  },
  async editTask(id: string, task: TaskType) {
    return await instance.put<TaskType>(`tasks/${id}`, task).then(res => res.data)
  },
  async removeTask(id: string) {
    return await instance.delete<TaskType>(`tasks/${id}`).then(res => res.data)
  }
}