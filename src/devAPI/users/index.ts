import { User } from "../../hooks/users/getUser";
import { createElem, deleteByIds, filterSort, paginationSort, putElemById } from ".././utils"
import { fakeDataUsers } from "./data";

interface Users {
  users: User[]
}

const data: Users = new (fakeDataUsers as any)()

export const fakeUsers = (url: string, config: any) => {
  if (config.method === 'get') {
    const id = url.match(/.*\/(.*)$/);
    if (id && id[1] !== 'users') {
      if (id[1] === 'user') {
        const username = localStorage.getItem('user_name')
        return data.users.find(user => user.username === username)
      }
      const usersIds = data.users.map(user => user.id!.toString())
      if (usersIds.includes(id[1])) {
        return data.users.find(user => user.id!.toString() === id[1])
      }
      throw new Error('Get user error')
    }
    const filterContent = filterSort(data.users, config.params)
    const content = paginationSort(filterContent, config.params);
    return {
      content,
      number: config.params.page,
      numberOfElements: content.length,
      size: config.params.size,
      totalElements: filterContent.length,
      totalPages: Number.isInteger(filterContent.length / config.params.size) ? filterContent.length / config.params.size : filterContent.length / config.params.size  + 1
    };
  } else if (config.method === 'delete') {
    if (config.data.includes(29)) {
      throw new Error('Error')
    } else {
      data.users = deleteByIds(data.users, config.data)
      return data.users
    }
  } else if (config.method === 'post') {
    const elem = {
      ...config.data,
      roles: config.data.roles[0]
    }
    return createElem(data.users, elem);
  } else if (config.method === 'put') {
    const id = url.match(/.*\/(.*)$/);
    if (id) {
      const usersIds = data.users.map(user => user.id!.toString())
      if (usersIds.includes(id[1])) {
        putElemById(data.users, config.data, id)
        return config.data
      }
      throw new Error('Edit user error')
    }
  }
}

